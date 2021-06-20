import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  orderMachine: DS.attr('number'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  machine: DS.belongsTo('cpmc-machine', { inverse: null, async: false }),
  processOrder: DS.belongsTo('cpmc-process-order', { inverse: 'processOrderItem', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      machine: { presence: true },
      processOrder: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'cpmc-process-order-item', {
    orderMachine: Projection.attr('Order machine'),
    machine: Projection.belongsTo('cpmc-machine', 'Machine', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' })
  });
  modelClass.defineProjection('ProcessOrderItemE', 'cpmc-process-order-item', {
    orderMachine: Projection.attr('Порядок'),
    machine: Projection.belongsTo('cpmc-machine', 'Оборудование', {
      code: Projection.attr('', { hidden: true }),
      name: Projection.attr('Наименование оборудования')
    }, { displayMemberPath: 'code' })
  });
};
