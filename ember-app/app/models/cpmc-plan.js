import { Model as PlanMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-plan';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, PlanMixin, {

});
defineProjections(Model);
export default Model;
