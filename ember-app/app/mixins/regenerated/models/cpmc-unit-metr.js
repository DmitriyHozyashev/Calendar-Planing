import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number'),
  name: DS.attr('string'),
  shortName: DS.attr('string'),
  coefficient: DS.attr('number'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  baseUnit: DS.belongsTo('cpmc-unit-metr', { inverse: null, async: false }),
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
  modelClass.defineProjection('AuditView', 'cpmc-unit-metr', {
    code: Projection.attr('Code'),
    name: Projection.attr('Name'),
    shortName: Projection.attr('Short name'),
    coefficient: Projection.attr('Coefficient'),
    createTime: Projection.attr('Create time'),
    creator: Projection.attr('Creator'),
    editTime: Projection.attr('Edit time'),
    editor: Projection.attr('Editor'),
    baseUnit: Projection.belongsTo('cpmc-unit-metr', 'Base unit', {
      name: Projection.attr('Name')
    })
  });
  modelClass.defineProjection('UnitMetrE', 'cpmc-unit-metr', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    shortName: Projection.attr('Сокращение'),
    coefficient: Projection.attr('Коэфициент преобразования'),
    baseUnit: Projection.belongsTo('cpmc-unit-metr', 'Базовая единица измерения', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' })
  });
  modelClass.defineProjection('UnitMetrL', 'cpmc-unit-metr', {
    code: Projection.attr('Код'),
    name: Projection.attr('Наименование'),
    shortName: Projection.attr('Сокращение'),
    coefficient: Projection.attr('Коэфициент преобразования'),
    baseUnit: Projection.belongsTo('cpmc-unit-metr', 'Базовая еденица измерения', {
      name: Projection.attr('Базовая еденица измерения')
    }, { hidden: true })
  });
};
