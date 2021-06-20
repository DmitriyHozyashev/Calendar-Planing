import { Model as OperationMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-operation';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, OperationMixin, {

});
defineProjections(Model);
export default Model;
