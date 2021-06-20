import { Model as UnitMetrMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-unit-metr';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, UnitMetrMixin, {

});
defineProjections(Model);
export default Model;
