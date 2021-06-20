import { Model as ProcessOrderItemMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-process-order-item';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, ProcessOrderItemMixin, {

});
defineProjections(Model);
export default Model;
