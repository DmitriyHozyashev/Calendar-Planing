import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number'),
  name: DS.attr('string'),
  laborIntensity: DS.attr('number'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  laborIntensityUnit: DS.belongsTo('cpmc-unit-metr', { inverse: null, async: false }),
  processOrder: DS.belongsTo('cpmc-process-order', { inverse: null, async: false }),
  workType: DS.belongsTo('cpmc-work-type', { inverse: null, async: false }),
  unitMetr: DS.belongsTo('cpmc-unit-metr', { inverse: null, async: false }),
  dSERout: DS.hasMany('cpmc-d-s-e-rout', { inverse: 'dSE', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      laborIntensityUnit: { presence: true },
      processOrder: { presence: true },
      workType: { presence: true },
      unitMetr: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'cpmc-d-s-e', {
    code: Projection.attr('Code'),
    name: Projection.attr('Name'),
    laborIntensity: Projection.attr('Labor intensity'),
    laborIntensityUnit: Projection.belongsTo('cpmc-unit-metr', 'Labor intensity unit', {
      name: Projection.attr('Name')
    }),
    processOrder: Projection.belongsTo('cpmc-process-order', 'Process order', {
      name: Projection.attr('Name')
    }),
    workType: Projection.belongsTo('cpmc-work-type', 'Work type', {
      name: Projection.attr('Name')
    }),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Unit metr', {
      name: Projection.attr('Name')
    }),
    dSERout: Projection.hasMany('cpmc-d-s-e-rout', 'D s e rout', {
      code: Projection.attr('Code'),
      name: Projection.attr('Name'),
      orderMachine: Projection.attr('Order machine'),
      nameMachine: Projection.attr('Name machine'),
      codeMachine: Projection.attr('Code machine'),
      processTime: Projection.attr('Process time'),
      tool: Projection.belongsTo('cpmc-tool', 'Tool', {
        name: Projection.attr('Name', { hidden: true })
      }, { displayMemberPath: 'name' }),
      unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Unit metr', {
        name: Projection.attr('Name', { hidden: true })
      }, { displayMemberPath: 'name' }),
      material: Projection.belongsTo('cpmc-material', 'Material', {
        name: Projection.attr('Name', { hidden: true })
      }, { displayMemberPath: 'name' }),
      operation: Projection.belongsTo('cpmc-operation', 'Operation', {
        name: Projection.attr('Name', { hidden: true })
      }, { displayMemberPath: 'name' })
    })
  });
  modelClass.defineProjection('DSEE', 'cpmc-d-s-e', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    workType: Projection.belongsTo('cpmc-work-type', 'Тип', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' }),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Единицы измерения', {
      shortName: Projection.attr('')
    }, { displayMemberPath: 'shortName' }),
    laborIntensity: Projection.attr('Трудоемкость'),
    laborIntensityUnit: Projection.belongsTo('cpmc-unit-metr', 'Единицы измерения', {
      shortName: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'shortName' }),
    processOrder: Projection.belongsTo('cpmc-process-order', 'Порядок обработки', {
      name: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'name' }),
    dSERout: Projection.hasMany('cpmc-d-s-e-rout', 'Маршрут', {
      orderMachine: Projection.attr('Порядок оборудования'),
      nameMachine: Projection.attr('Наименование оборудования'),
      codeMachine: Projection.attr('Код оборудования'),
      processTime: Projection.attr('Время обработки'),
      unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Ед. измерения', {
        shortName: Projection.attr('', { hidden: true })
      }, { displayMemberPath: 'shortName' }),
      tool: Projection.belongsTo('cpmc-tool', 'Инструмент', {
        name: Projection.attr('', { hidden: true })
      }, { displayMemberPath: 'name' }),
      material: Projection.belongsTo('cpmc-material', 'Материал', {
        name: Projection.attr('', { hidden: true })
      }, { displayMemberPath: 'name' }),
      operation: Projection.belongsTo('cpmc-operation', 'Операция', {
        name: Projection.attr('', { hidden: true })
      }, { displayMemberPath: 'name' })
    })
  });
  modelClass.defineProjection('DSEL', 'cpmc-d-s-e', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Единицы измерения', {
      shortName: Projection.attr('Единицы измерения')
    }, { hidden: true }),
    laborIntensity: Projection.attr('Трудоемкость'),
    laborIntensityUnit: Projection.belongsTo('cpmc-unit-metr', 'Единицы измерения', {
      shortName: Projection.attr('Единицы измерения')
    }, { hidden: true }),
    workType: Projection.belongsTo('cpmc-work-type', 'Name', {
      name: Projection.attr('Name')
    }, { hidden: true }),
    createTime: Projection.attr('Дата создания'),
    creator: Projection.attr('Создатель'),
    editTime: Projection.attr('Дата редактирвоани'),
    editor: Projection.attr('Редактор')
  });
};
