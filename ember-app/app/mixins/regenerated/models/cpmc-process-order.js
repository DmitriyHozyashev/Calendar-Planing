import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  processOrderItem: DS.hasMany('cpmc-process-order-item', { inverse: 'processOrder', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'cpmc-process-order', {
    name: Projection.attr('Name'),
    processOrderItem: Projection.hasMany('cpmc-process-order-item', 'Process order item', {
      orderMachine: Projection.attr('Order machine'),
      machine: Projection.belongsTo('cpmc-machine', 'Machine', {
        name: Projection.attr('Name', { hidden: true })
      }, { displayMemberPath: 'name' })
    })
  });
  modelClass.defineProjection('ProcessOrderE', 'cpmc-process-order', {
    name: Projection.attr('Наименование'),
    processOrderItem: Projection.hasMany('cpmc-process-order-item', 'Оборудование', {
      orderMachine: Projection.attr('Порядок'),
      machine: Projection.belongsTo('cpmc-machine', 'Оборудование', {
        code: Projection.attr('', { hidden: true }),
        name: Projection.attr('Наименование оборудования')
      }, { displayMemberPath: 'code' })
    })
  });
  modelClass.defineProjection('ProcessOrderL', 'cpmc-process-order', {
    name: Projection.attr('Наименование')
  });
};
