import EditFormController from 'ember-flexberry/controllers/edit-form';
import { Query } from 'ember-flexberry-data';

export default EditFormController.extend({
  parentRoute: 'cpmc-d-s-e-l',

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'cpmc-d-s-e-rout+unitMetr':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'shortName',
            required: true,
            relationName: 'unitMetr',
            projection: 'UnitMetrL',
            autocomplete: true,
          };
          break;

        case 'cpmc-d-s-e-rout+tool':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'name',
            required: true,
            relationName: 'tool',
            projection: 'ToolL',
            autocomplete: true,
          };
          break;

        case 'cpmc-d-s-e-rout+material':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'name',
            required: true,
            relationName: 'material',
            projection: 'MaterialL',
            autocomplete: true,
          };
          break;

        case 'cpmc-d-s-e-rout+operation':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'name',
            required: true,
            relationName: 'operation',
            projection: 'OperationL',
            autocomplete: true,
          };
          break;

      }
    }
    else {
      switch (bindingPath) {
        case 'orderMachine':
          cellComponent.componentProperties = {
            readonly: true,
          };
          break;
        case 'nameMachine':
          cellComponent.componentProperties = {
            readonly: true,
          };
          break;
      }
    }

    return cellComponent;
  },

  actions: {
    createRoute() {
      var store = this.get('store');
      // let processOrder = this.model.get('processOrder');

      let processOrderId = this.model.get('processOrder.id');
      let builder = new Query.Builder(store)
          .from('cpmc-process-order-item')
          .selectByProjection('ProcessOrderItemE')
          .where('processOrder', Query.FilterOperator.Eq, processOrderId);
      
      store.query('cpmc-process-order-item', builder.build()).then((result) => {
        let processOrderItemsArray = [];
        result.content.forEach(item => {
          let record = item.record;
          let newRecord = store.createRecord('cpmc-d-s-e-rout', {
            orderMachine: record.get('orderMachine'),
            nameMachine: record.get('machine.name'),
            codeMachine: record.get('machine.code')
          });
          processOrderItemsArray.push(newRecord);
        });

        this.model.set('dSERout', processOrderItemsArray);
      });
    }
  }
});
