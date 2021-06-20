import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
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
  modelClass.defineProjection('AuditView', 'cpmc-machine', {
    code: Projection.attr('Code'),
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    createTime: Projection.attr('Create time'),
    creator: Projection.attr('Creator'),
    editTime: Projection.attr('Edit time'),
    editor: Projection.attr('Editor')
  });
  modelClass.defineProjection('MachineE', 'cpmc-machine', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    description: Projection.attr('Описание')
  });
  modelClass.defineProjection('MachineL', 'cpmc-machine', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    createTime: Projection.attr('Дата создания'),
    creator: Projection.attr('Создатель'),
    editTime: Projection.attr('Дата редактирования'),
    editor: Projection.attr('Редактор')
  });
};
