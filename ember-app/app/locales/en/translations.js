import Ember from 'ember';
import EmberFlexberryTranslations from 'ember-flexberry/locales/en/translations';

import cpmcDSELForm from './forms/cpmc-d-s-e-l';
import cpmcMachineLForm from './forms/cpmc-machine-l';
import cpmcMaterialLForm from './forms/cpmc-material-l';
import cpmcOperationLForm from './forms/cpmc-operation-l';
import cpmcPlanLForm from './forms/cpmc-plan-l';
import cpmcProcessOrderLForm from './forms/cpmc-process-order-l';
import cpmcToolLForm from './forms/cpmc-tool-l';
import cpmcUnitMetrLForm from './forms/cpmc-unit-metr-l';
import cpmcWorkTypeLForm from './forms/cpmc-work-type-l';
import cpmcDSEEForm from './forms/cpmc-d-s-e-e';
import cpmcMachineEForm from './forms/cpmc-machine-e';
import cpmcMaterialEForm from './forms/cpmc-material-e';
import cpmcOperationEForm from './forms/cpmc-operation-e';
import cpmcPlanEForm from './forms/cpmc-plan-e';
import cpmcProcessOrderEForm from './forms/cpmc-process-order-e';
import cpmcToolEForm from './forms/cpmc-tool-e';
import cpmcUnitMetrEForm from './forms/cpmc-unit-metr-e';
import cpmcWorkTypeEForm from './forms/cpmc-work-type-e';
import cpmcDSERoutModel from './models/cpmc-d-s-e-rout';
import cpmcDSEModel from './models/cpmc-d-s-e';
import cpmcMachineModel from './models/cpmc-machine';
import cpmcMaterialModel from './models/cpmc-material';
import cpmcOperationModel from './models/cpmc-operation';
import cpmcPlanItemModel from './models/cpmc-plan-item';
import cpmcPlanModel from './models/cpmc-plan';
import cpmcProcessOrderItemModel from './models/cpmc-process-order-item';
import cpmcProcessOrderModel from './models/cpmc-process-order';
import cpmcResourseModel from './models/cpmc-resourse';
import cpmcToolModel from './models/cpmc-tool';
import cpmcUnitMetrModel from './models/cpmc-unit-metr';
import cpmcWorkTypeModel from './models/cpmc-work-type';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryTranslations);

Ember.$.extend(true, translations, {
  models: {
    'cpmc-d-s-e-rout': cpmcDSERoutModel,
    'cpmc-d-s-e': cpmcDSEModel,
    'cpmc-machine': cpmcMachineModel,
    'cpmc-material': cpmcMaterialModel,
    'cpmc-operation': cpmcOperationModel,
    'cpmc-plan-item': cpmcPlanItemModel,
    'cpmc-plan': cpmcPlanModel,
    'cpmc-process-order-item': cpmcProcessOrderItemModel,
    'cpmc-process-order': cpmcProcessOrderModel,
    'cpmc-resourse': cpmcResourseModel,
    'cpmc-tool': cpmcToolModel,
    'cpmc-unit-metr': cpmcUnitMetrModel,
    'cpmc-work-type': cpmcWorkTypeModel,
  },

  'application-name': 'Application caption',

  forms: {
    loading: {
      'spinner-caption': 'Loading stuff, please have a cold beer...'
    },
    index: {
      greeting: 'Welcome to ember-flexberry test stand!'
    },

    application: {
      header: {
        menu: {
          'sitemap-button': {
            caption: '',
            title: 'Menu'
          },
          'user-settings-service-checkbox': {
            caption: 'Use service to save user settings'
          },
          'show-menu': {
            caption: 'Show menu'
          },
          'hide-menu': {
            caption: 'Hide menu'
          },
          'language-dropdown': {
            caption: 'Application language',
            placeholder: 'Choose language'
          }
        },
        login: {
          caption: 'Login'
        },
        logout: {
          caption: 'Logout'
        }
      },

      footer: {
        'application-name': 'Application caption',
        'application-version': {
          caption: 'Addon version {{version}}',
          title: 'It is version of ember-flexberry addon, which uses in this dummy application ' +
          '(npm version + commit sha). ' +
          'Click to open commit on GitHub.'
        }
      },

      sitemap: {
        'application-name': {
          caption: 'Application caption',
          title: 'Application title'
        },
        'application-version': {
          caption: 'Addon version {{version}}',
          title: 'It is version of ember-flexberry addon, which uses in this dummy application ' +
          '(npm version + commit sha). ' +
          'Click to open commit on GitHub.'
        },
        index: {
          caption: 'Home',
          title: ''
        },
        планирование: {
          caption: 'планирование',
          title: 'планирование',
          'cpmc-plan-l': {
            caption: 'cpmc-plan-l',
            title: 'cpmc-plan-l',

          },
          'cpmc-d-s-e-l': {
            caption: 'cpmc-d-s-e-l',
            title: 'cpmc-d-s-e-l',

          },
          'cpmc-process-order-l': {
            caption: 'cpmc-process-order-l',
            title: 'cpmc-process-order-l',

          }
        },
        справочники: {
          caption: 'справочники',
          title: 'справочники',
          'cpmc-unit-metr-l': {
            caption: 'cpmc-unit-metr-l',
            title: 'cpmc-unit-metr-l',

          },
          'cpmc-work-type-l': {
            caption: 'cpmc-work-type-l',
            title: 'cpmc-work-type-l',

          },
          'cpmc-machine-l': {
            caption: 'cpmc-machine-l',
            title: 'cpmc-machine-l',

          },
          'cpmc-tool-l': {
            caption: 'cpmc-tool-l',
            title: 'cpmc-tool-l',

          },
          'cpmc-material-l': {
            caption: 'cpmc-material-l',
            title: 'cpmc-material-l',

          },
          'cpmc-operation-l': {
            caption: 'cpmc-operation-l',
            title: 'cpmc-operation-l',

          }
        },
      }
    },

    'edit-form': {
      'save-success-message-caption': 'Save operation succeed',
      'save-success-message': 'Object saved',
      'save-error-message-caption': 'Save operation failed',
      'delete-success-message-caption': 'Delete operation succeed',
      'delete-success-message': 'Object deleted',
      'delete-error-message-caption': 'Delete operation failed'
    },
    'cpmc-d-s-e-l': cpmcDSELForm,
    'cpmc-machine-l': cpmcMachineLForm,
    'cpmc-material-l': cpmcMaterialLForm,
    'cpmc-operation-l': cpmcOperationLForm,
    'cpmc-plan-l': cpmcPlanLForm,
    'cpmc-process-order-l': cpmcProcessOrderLForm,
    'cpmc-tool-l': cpmcToolLForm,
    'cpmc-unit-metr-l': cpmcUnitMetrLForm,
    'cpmc-work-type-l': cpmcWorkTypeLForm,
    'cpmc-d-s-e-e': cpmcDSEEForm,
    'cpmc-machine-e': cpmcMachineEForm,
    'cpmc-material-e': cpmcMaterialEForm,
    'cpmc-operation-e': cpmcOperationEForm,
    'cpmc-plan-e': cpmcPlanEForm,
    'cpmc-process-order-e': cpmcProcessOrderEForm,
    'cpmc-tool-e': cpmcToolEForm,
    'cpmc-unit-metr-e': cpmcUnitMetrEForm,
    'cpmc-work-type-e': cpmcWorkTypeEForm,
  },

});

export default translations;
