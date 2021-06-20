import { Model as PlanItemMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-plan-item';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, PlanItemMixin, {

});
defineProjections(Model);
export default Model;
