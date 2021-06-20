import Ember from 'ember';

export let OfflineSerializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      tool: { serialize: 'id', deserialize: 'records' },
      unitMetr: { serialize: 'id', deserialize: 'records' },
      material: { serialize: 'id', deserialize: 'records' },
      operation: { serialize: 'id', deserialize: 'records' },
      dSE: { serialize: 'id', deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});
