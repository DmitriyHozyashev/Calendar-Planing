import { Model as MaterialMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-material';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, MaterialMixin, {

});
defineProjections(Model);
export default Model;
