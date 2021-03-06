import Ember from 'ember';

export let OfflineSerializer = Ember.Mixin.create({
  getAttrs: function () {
    let parentAttrs = this._super();
    let attrs = {
      laborIntensityUnit: { serialize: 'id', deserialize: 'records' },
      processOrder: { serialize: 'id', deserialize: 'records' },
      workType: { serialize: 'id', deserialize: 'records' },
      unitMetr: { serialize: 'id', deserialize: 'records' },
      dSERout: { serialize: 'ids', deserialize: 'records' }
    };

    return Ember.$.extend(true, {}, parentAttrs, attrs);
  },
  init: function () {
    this.set('attrs', this.getAttrs());
    this._super(...arguments);
  }
});
