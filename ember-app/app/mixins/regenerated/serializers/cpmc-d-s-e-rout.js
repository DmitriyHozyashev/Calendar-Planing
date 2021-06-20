import Ember from 'ember';

export let Serializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      tool: { serialize: 'odata-id', deserialize: 'records' },
      unitMetr: { serialize: 'odata-id', deserialize: 'records' },
      material: { serialize: 'odata-id', deserialize: 'records' },
      operation: { serialize: 'odata-id', deserialize: 'records' },
      dSE: { serialize: 'odata-id', deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});
