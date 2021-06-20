import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tPlanAlgorithmEnum from '../enums/cpmc-t-plan-algorithm';

export default FlexberryEnum.extend({
  enum: tPlanAlgorithmEnum,
  sourceType: 'cpmc.tPlanAlgorithm'
});
