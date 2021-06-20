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
  unitMetr: DS.belongsTo('cpmc-unit-metr', { inverse: null, async: false }),
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
  modelClass.defineProjection('AuditView', 'cpmc-material', {
    name: Projection.attr('Name'),
    code: Projection.attr('Code'),
    createTime: Projection.attr('Create time'),
    creator: Projection.attr('Creator'),
    editTime: Projection.attr('Edit time'),
    editor: Projection.attr('Editor'),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Unit metr', {
      name: Projection.attr('Name')
    })
  });
  modelClass.defineProjection('MaterialE', 'cpmc-material', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Ед. измерения', {
      shortName: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'shortName' })
  });
  modelClass.defineProjection('MaterialL', 'cpmc-material', {
    code: Projection.attr('Крд'),
    name: Projection.attr('Наименование'),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Ед. измерения', {
      shortName: Projection.attr('Ед. измерения')
    }, { hidden: true })
  });
};
