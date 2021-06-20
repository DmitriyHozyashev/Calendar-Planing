import { Model as ProcessOrderMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-process-order';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, ProcessOrderMixin, {

});
defineProjections(Model);
export default Model;
