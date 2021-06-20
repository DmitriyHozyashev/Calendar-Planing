import { Model as WorkTypeMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-work-type';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, WorkTypeMixin, {

});
defineProjections(Model);
export default Model;
