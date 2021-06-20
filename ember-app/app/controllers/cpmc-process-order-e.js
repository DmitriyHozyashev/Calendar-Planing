import EditFormController from 'ember-flexberry/controllers/edit-form';

export default EditFormController.extend({
  parentRoute: 'cpmc-process-order-l',

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'cpmc-process-order-item+machine':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'code',
            required: true,
            relationName: 'machine',
            projection: 'MachineL',
            autocomplete: true,
          };
          break;

      }
    }

    return cellComponent;
  },
});
