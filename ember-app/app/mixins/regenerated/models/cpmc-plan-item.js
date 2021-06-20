import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  dSE: DS.belongsTo('cpmc-d-s-e', { inverse: null, async: false }),
  plan: DS.belongsTo('cpmc-plan', { inverse: 'planItem', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      dSE: { presence: true },
      plan: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'cpmc-plan-item', {
    dSE: Projection.belongsTo('cpmc-d-s-e', 'DSE', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' })
  });
  modelClass.defineProjection('PlanItemE', 'cpmc-plan-item', {
    dSE: Projection.belongsTo('cpmc-d-s-e', 'Код', {
      code: Projection.attr('', { hidden: true }),
      name: Projection.attr('Наименование'),
      processOrder: Projection.belongsTo('cpmc-process-order', '', {
        name: Projection.attr('Порядок обработки')
      }, { hidden: true })
    }, { displayMemberPath: 'code' })
  });
};
