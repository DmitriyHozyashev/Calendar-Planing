import { Model as DSEMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-d-s-e';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DSEMixin, {

});
defineProjections(Model);
export default Model;
