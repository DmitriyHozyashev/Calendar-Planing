import { Model as ToolMixin, defineProjections } from
  '../mixins/regenerated/models/cpmc-tool';
  import { Projection } from 'ember-flexberry-data';
  import { Offline } from 'ember-flexberry-data';
  let Model = Projection.Model.extend(Offline.ModelMixin, ToolMixin, {

});
defineProjections(Model);
export default Model;
