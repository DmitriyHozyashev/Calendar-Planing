import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  code: DS.attr('number'),
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
  modelClass.defineProjection('AuditView', 'cpmc-operation', {
    name: Projection.attr('Name'),
    code: Projection.attr('Code'),
    createTime: Projection.attr('Create time'),
    creator: Projection.attr('Creator'),
    editTime: Projection.attr('Edit time'),
    editor: Projection.attr('Editor')
  });
  modelClass.defineProjection('OperationE', 'cpmc-operation', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование')
  });
  modelClass.defineProjection('OperationL', 'cpmc-operation', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование')
  });
};
