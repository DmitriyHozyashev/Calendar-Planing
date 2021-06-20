import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  comment: DS.attr('string'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
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
  modelClass.defineProjection('AuditView', 'cpmc-work-type', {
    name: Projection.attr('Name'),
    comment: Projection.attr('Comment'),
    createTime: Projection.attr('Create time'),
    creator: Projection.attr('Creator'),
    editTime: Projection.attr('Edit time'),
    editor: Projection.attr('Editor')
  });
  modelClass.defineProjection('WorkTypeE', 'cpmc-work-type', {
    name: Projection.attr('Наименование'),
    comment: Projection.attr('Комментарий')
  });
  modelClass.defineProjection('WorkTypeL', 'cpmc-work-type', {
    name: Projection.attr('Наименование'),
    comment: Projection.attr('Комментарий'),
    createTime: Projection.attr(''),
    creator: Projection.attr(''),
    editTime: Projection.attr(''),
    editor: Projection.attr('')
  });
};
