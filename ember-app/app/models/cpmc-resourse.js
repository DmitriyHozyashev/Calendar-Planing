import { Model as ResourseMixin } from
  '../mixins/regenerated/models/cpmc-resourse';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, ResourseMixin, {

});
export default Model;
