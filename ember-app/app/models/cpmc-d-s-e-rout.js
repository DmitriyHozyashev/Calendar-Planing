import { Model as DSERoutMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-d-s-e-rout';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DSERoutMixin, {

});
defineProjections(Model);
export default Model;
