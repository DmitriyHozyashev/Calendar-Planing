import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tPlanStateEnum from '../enums/cpmc-t-plan-state';

export default FlexberryEnum.extend({
  enum: tPlanStateEnum,
  sourceType: 'cpmc.tPlanState'
});
