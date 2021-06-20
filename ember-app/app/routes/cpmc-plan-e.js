import Ember from 'ember';
import EditFormRoute from 'ember-flexberry/routes/edit-form';
import { Query } from 'ember-flexberry-data';

export default EditFormRoute.extend({
  modelProjection: 'PlanE',
  modelName: 'cpmc-plan',

  renderTemplate() {
    this._super();
    let id = this.get('model.id');
    this.getDetailsData1();
  },

  getDetailsData1() {
    let controller = this.controllerFor('cpmc-plan-e');
    let store = controller.get('store');
    let planItems = controller.get('model.planItem');

    if (planItems.length > 0) {

      let contentForRender = Ember.A();
      let itemsProcessed = 0;
      planItems.forEach((item) => {
        contentForRender.pushObject(item);
      });

      let operationTimeArr = Ember.A();
      let dseOrder = Ember.A();

      // Массив время обработки
      contentForRender.forEach((item, index, array) => {
        let dseId = item.get('dSE.id');
        let dseNmae = item.get('dSE.name');
        let builder = new Query.Builder(store)
            .from('cpmc-d-s-e-rout')
            .selectByProjection('DSERoutE')
            .where('dSE', Query.FilterOperator.Eq, dseId);

        let routeArray = [];
        store.query('cpmc-d-s-e-rout', builder.build()).then((result) => {
          if (result.content.length > 0) {
            dseOrder.push(dseNmae);
            result.content.forEach(item => {
              routeArray.push(item.record);
            });
            operationTimeArr.pushObject(routeArray);
            itemsProcessed++;
            if(itemsProcessed === array.length) {
              controller.set('routeArray', operationTimeArr);
              controller.set('dseOrder', dseOrder);
            }
          }
        });
      });

      // Получить порядок обработки.
      let processOrderId = contentForRender[0].get('dSE.processOrder.id');
      let builder2 = new Query.Builder(store)
          .from('cpmc-process-order-item')
          .selectByProjection('ProcessOrderItemE')
          .where('processOrder', Query.FilterOperator.Eq, processOrderId);
      let processOrderItemsArray = [];
      return store.query('cpmc-process-order-item', builder2.build()).then((result) => {
        result.content.forEach(item => {
          processOrderItemsArray.push(item.record);
        });
        controller.set('processOrderItemsArray', processOrderItemsArray);
      });
    }
  },

  actions: {
    getDetailsData() {
      this.getDetailsData1();
    }
  }
});
