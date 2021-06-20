import EditFormController from 'ember-flexberry/controllers/edit-form';
import { Query } from 'ember-flexberry-data';
import tPlanAlgorithmEnum from '../enums/cpmc-t-plan-algorithm';

export default EditFormController.extend({
  parentRoute: 'cpmc-plan-l',
  routeArray: [],
  processOrderItemsArray: [],
  dseOrder: [],
  visibleChart: true,

  getCellComponent(attr, bindingPath, model) {
    let cellComponent = this._super(...arguments);
    if (attr.kind === 'belongsTo') {
      switch (`${model.modelName}+${bindingPath}`) {
        case 'cpmc-plan-item+dSE':
          cellComponent.componentProperties = {
            choose: 'showLookupDialog',
            remove: 'removeLookupValue',
            displayAttributeName: 'code',
            required: true,
            relationName: 'dSE',
            projection: 'DSEL',
            autocomplete: false,
          };
          break;
      }
    }
    else {
      switch (bindingPath) {
        case 'dSE.processOrder.name':
          cellComponent.componentProperties = {
            readonly: true,
          };
          break;
        case 'dSE.name':
          cellComponent.componentProperties = {
            readonly: true,
          };
          break;
      }
    }

    return cellComponent;
  },

  actions: {
    getPlan:function() {
      this.send('getDetailsData');
    },
    
    save(){
      this._super(...arguments);
      this.send('getDetailsData');
    },

    report() {
      let blob = new Blob([], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      let anchor = Ember.$('.download-anchor');
      if (!Ember.isBlank(anchor)) {
        if (window.navigator.msSaveOrOpenBlob) {
          let downloadFunction = function() {
            window.navigator.msSaveOrOpenBlob(blob, 'file.docx');
          };

          anchor.on('click', downloadFunction);
          anchor.get(0).click();
          anchor.off('click', downloadFunction);
        } else {
          let downloadUrl = URL.createObjectURL(blob);
          anchor.prop('href', downloadUrl);
          anchor.prop('download', 'file.docx');
          anchor.get(0).click();
        }
      }
    }
  }
});
