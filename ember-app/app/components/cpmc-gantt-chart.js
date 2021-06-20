import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
import { frontAlg, getSumTime, leksAlg, nehAlg, jonsonAlg } from '../utils/algorithms';
import tPlanAlgorithmEnum from '../enums/cpmc-t-plan-algorithm';

export default Ember.Component.extend({
  /**
    Content to be displayed (models collection).
    @property content
    @type DS.ManyArray
    @default null
  */
  planItems: null,

  planRoute:null,

  planProcessOrder: null,

  dseOrder: null,

  algorithm: null,

  sumTime: 0,

  planJSON: undefined,

  /**
    Array of models from content collection with some synthetic keys related to them.
    @property contentWithKeys
    @type Object[]
    @default null
  */
  planItemsArray: null,

  _contentObserver: Ember.on('init', Ember.observer('planItems', function() {
    this._setContent();
  })),

   /**
    Sets content for component.
    @method _setContent
    @param {String} componentName Name of the component.
    @param {Array} sorting Array of sorting definitions.
  */
  _setContent() {
    let content = this.get('planItems');
    if (content && !content.isLoading) {
      this.set('planItemsArray', Ember.A());

      content.forEach((item) => {
        this.get('planItemsArray').pushObject(item)
      });

    }
  },

  _getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  },

  _getChartData() {
    let planItems = this.get('planItemsArray');
    if (planItems.length === 0) {
      return;
    }

    let planRoute = this.get('planRoute');
    let planProcessOrder = this.get('planProcessOrder');
    let dseOrder = this.get('dseOrder');
    let algorithm = this._getKeyByValue(tPlanAlgorithmEnum, this.get('algorithm'));
  
    // Порядок обработки
    let processOrderArr = [];

    // Получить массив порядок обработки
    planProcessOrder.forEach((item) => {
      let order = item.get('orderMachine');
      processOrderArr[--order] = item.get('machine.name');
    });

    let planRouteArr = [];

    // Маршрут и время обработки (порядок деталей в исходном плане не важен)
    planRoute.forEach((itemArr, index, arr) => {
      planRouteArr[index] = [];
      itemArr.forEach((item, i, a) => {
        let order = item.get('orderMachine');
        planRouteArr[index][--order] = item.get('processTime');
      });
    });

    let _dataTable = [];
    let resultArr;
    if (planRouteArr.length > 0) {
      switch (algorithm) {
        case 'Front': {
          resultArr = frontAlg(planRouteArr);
          break;
        };
        case 'Lex': {
          resultArr = leksAlg(planRouteArr);
          break;
        };
        case 'All': {
          // break;
        };
        case 'NEH': {
          resultArr = nehAlg(planRouteArr);
          break;
        };
        case 'Jonson': {
          resultArr = jonsonAlg(planRouteArr);
          break;
        };
        default: {
          resultArr = frontAlg(planRouteArr);
          break;
        }
      }

      let sumTime = getSumTime(resultArr);
      this.set('sumTime', sumTime);
      // var myJSON = JSON.stringify(resultArr);
      this.set('planJSON', JSON.stringify(resultArr));
      

      resultArr.forEach((item, index) => {
        processOrderArr.forEach((itemM, indexM) => {
          let currentTimeStart = item.operations[indexM].timeStart;
          let currentTimeEnd = item.operations[indexM].timeEnd;
          let tableCell = [itemM, dseOrder[item.numWork], new Date(0,0,0,currentTimeStart,0,0), new Date(0,0,0,currentTimeEnd,0,0)];
          _dataTable.push(tableCell);
        });
      });

      google.charts.load("current", {packages:["timeline"]});
      google.charts.setOnLoadCallback(drawChart);
    }

    function drawChart() {
      var container = document.getElementById('ganttChart');
      var chart = new google.visualization.Timeline(container);
      var dataTable = new google.visualization.DataTable();
  
      dataTable.addColumn({ type: 'string', id: 'Machine' });
      dataTable.addColumn({ type: 'string', id: 'DSE' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });
      dataTable.addRows(_dataTable);
  
      var dateFormatter = new google.visualization.DateFormat({pattern: 'HH:mm'});
      dateFormatter.format(dataTable, 1);

      var options = {
        avoidOverlappingGridLines: false,
        hAxis: {
          format: 'HH:mm'
        }
      };
  
      chart.draw(dataTable, options);
    }
  },

  didRender() {
    this._getChartData();
  }
});
