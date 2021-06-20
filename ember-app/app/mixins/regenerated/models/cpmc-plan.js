import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  algorithm: DS.attr('cpmc-t-plan-algorithm'),
  totalTime: DS.attr('number'),
  state: DS.attr('cpmc-t-plan-state'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  planJSON: DS.attr('string'),
  planItem: DS.hasMany('cpmc-plan-item', { inverse: 'plan', async: false }),
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
  modelClass.defineProjection('AuditView', 'cpmc-plan', {
    name: Projection.attr('Name'),
    algorithm: Projection.attr('Algorithm'),
    totalTime: Projection.attr('Total time'),
    state: Projection.attr('State'),
    planItem: Projection.hasMany('cpmc-plan-item', 'Plan item', {
      dSE: Projection.belongsTo('cpmc-d-s-e', 'DSE', {
        name: Projection.attr('Name', { hidden: true })
      }, { displayMemberPath: 'name' })
    })
  });
  modelClass.defineProjection('PlanE', 'cpmc-plan', {
    name: Projection.attr('Наименование'),
    state: Projection.attr('Состояние'),
    algorithm: Projection.attr('Алгоритм вычисления'),
    totalTime: Projection.attr('Общее время'),
    createTime: Projection.attr('Дата создания', { hidden: true }),
    creator: Projection.attr('Создатель', { hidden: true }),
    editTime: Projection.attr('Дата редактрвоания', { hidden: true }),
    editor: Projection.attr('Редактор', { hidden: true }),
    planJSON: Projection.attr('', { hidden: true }),
    planItem: Projection.hasMany('cpmc-plan-item', 'Строка плана', {
      dSE: Projection.belongsTo('cpmc-d-s-e', 'Код', {
        code: Projection.attr('', { hidden: true }),
        name: Projection.attr('Наименование'),
        processOrder: Projection.belongsTo('cpmc-process-order', '', {
          name: Projection.attr('Порядок обработки')
        }, { hidden: true })
      }, { displayMemberPath: 'code' })
    })
  });
  modelClass.defineProjection('PlanL', 'cpmc-plan', {
    name: Projection.attr('Наименование'),
    state: Projection.attr('Состояние'),
    algorithm: Projection.attr('Алгоритм вычисления'),
    totalTime: Projection.attr('Общее время'),
    createTime: Projection.attr('Дата создания'),
    creator: Projection.attr('Создатель'),
    editTime: Projection.attr('Дата редактрвоания'),
    editor: Projection.attr('Редактор'),
    planItem: Projection.hasMany('cpmc-plan-item', '', {
      dSE: Projection.belongsTo('cpmc-d-s-e', 'Код', {
        code: Projection.attr('', { hidden: true }),
        name: Projection.attr('Наименование'),
        processOrder: Projection.belongsTo('cpmc-process-order', '', {
          name: Projection.attr('Порядок обработки')
        }, { hidden: true })
      }, { displayMemberPath: 'code' })
    })
  });
};
