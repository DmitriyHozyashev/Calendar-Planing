import Ember from 'ember';

export let Serializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      laborIntensityUnit: { serialize: 'odata-id', deserialize: 'records' },
      processOrder: { serialize: 'odata-id', deserialize: 'records' },
      workType: { serialize: 'odata-id', deserialize: 'records' },
      unitMetr: { serialize: 'odata-id', deserialize: 'records' },
      dSERout: { serialize: false, deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});
