import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  code: DS.attr('number'),
  name: DS.attr('string'),
  orderMachine: DS.attr('number'),
  nameMachine: DS.attr('string'),
  codeMachine: DS.attr('number'),
  processTime: DS.attr('number'),
  createTime: DS.attr('date'),
  creator: DS.attr('string'),
  editTime: DS.attr('date'),
  editor: DS.attr('string'),
  tool: DS.belongsTo('cpmc-tool', { inverse: null, async: false }),
  unitMetr: DS.belongsTo('cpmc-unit-metr', { inverse: null, async: false }),
  material: DS.belongsTo('cpmc-material', { inverse: null, async: false }),
  operation: DS.belongsTo('cpmc-operation', { inverse: null, async: false }),
  dSE: DS.belongsTo('cpmc-d-s-e', { inverse: 'dSERout', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      // tool: { presence: true },
      // unitMetr: { presence: true },
      // material: { presence: true },
      // operation: { presence: true },
      dSE: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AuditView', 'cpmc-d-s-e-rout', {
    code: Projection.attr('Code'),
    name: Projection.attr('Name'),
    processTime: Projection.attr('Process time'),
    tool: Projection.belongsTo('cpmc-tool', 'Tool', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' }),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Unit metr', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' }),
    material: Projection.belongsTo('cpmc-material', 'Material', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' }),
    operation: Projection.belongsTo('cpmc-operation', 'Operation', {
      name: Projection.attr('Name', { hidden: true })
    }, { displayMemberPath: 'name' })
  });
  modelClass.defineProjection('DSERoutE', 'cpmc-d-s-e-rout', {
    orderMachine: Projection.attr('Порядок оборудования'),
    nameMachine: Projection.attr('Наименование оборудования'),
    processTime: Projection.attr('Время обработки'),
    unitMetr: Projection.belongsTo('cpmc-unit-metr', 'Ед. измерения', {
      shortName: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'shortName' }),
    tool: Projection.belongsTo('cpmc-tool', 'Инструмент', {
      name: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'name' }),
    material: Projection.belongsTo('cpmc-material', 'Материал', {
      name: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'name' }),
    operation: Projection.belongsTo('cpmc-operation', 'Операция', {
      name: Projection.attr('', { hidden: true })
    }, { displayMemberPath: 'name' })
  });
};
