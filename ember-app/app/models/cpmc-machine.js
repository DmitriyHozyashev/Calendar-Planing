import { Model as MachineMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-machine';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, MachineMixin, {

});
defineProjections(Model);
export default Model;
