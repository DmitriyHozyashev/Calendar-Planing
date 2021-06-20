import Ember from 'ember';
import EmberFlexberryTranslations from 'ember-flexberry/locales/ru/translations';
import EmberFlexberrySecurityTranslations from 'ember-flexberry-security/locales/ru/translations';

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
Ember.$.extend(true, translations, EmberFlexberryTranslations, EmberFlexberrySecurityTranslations);

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

  'application-name': 'Планирование',

  forms: {
    loading: {
      'spinner-caption': 'Данные загружаются, пожалуйста подождите...'
    },
    index: {
      greeting: 'Добро пожаловать на тестовый стенд ember-flexberry!'
    },

    application: {
      header: {
        menu: {
          'sitemap-button': {
            caption: '',
            title: 'Меню'
          },
          'user-settings-service-checkbox': {
            caption: 'Использовать сервис сохранения пользовательских настроек'
          },
          'show-menu': {
            caption: 'Показать меню'
          },
          'hide-menu': {
            caption: 'Скрыть меню'
          },
          'language-dropdown': {
            caption: 'Язык приложения',
            placeholder: 'Выберите язык'
          }
        },
        login: {
          caption: 'Вход'
        },
        logout: {
          caption: 'Выход'
        }
      },

      footer: {
        'application-name': 'Планирование',
        'application-version': {
          caption: 'Версия аддона {{version}}',
          title: 'Это версия аддона ember-flexberry, которая сейчас используется в этом тестовом приложении ' +
          '(версия npm-пакета + хэш коммита). ' +
          'Кликните, чтобы перейти на GitHub.'
        }
      },

      sitemap: {
        'application-name': {
          caption: 'Планирование',
          title: 'Cpmc'
        },
        'application-version': {
          caption: 'Версия аддона {{version}}',
          title: 'Это версия аддона ember-flexberry, которая сейчас используется в этом тестовом приложении ' +
          '(версия npm-пакета + хэш коммита). ' +
          'Кликните, чтобы перейти на GitHub.'
        },
        index: {
          caption: 'Главная',
          title: ''
        },
        'administration': {
          'caption': 'Администрирование',
          'title': 'Администрирование',
          'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-entity-l': {
            'caption': 'Аудит',
            'title': 'Аудит'
          },
        },
        планирование: {
          caption: 'Планирование',
          title: 'Планирование',
          'cpmc-plan-l': {
            caption: 'Планы',
            title: '',

          },
          'cpmc-d-s-e-l': {
            caption: 'Детали',
            title: '',

          },
          'cpmc-process-order-l': {
            caption: 'Порядок обработки',
            title: '',

          }
        },
        справочники: {
          caption: 'Справочники',
          title: 'Справочники',
          'cpmc-unit-metr-l': {
            caption: 'Единицы измерения',
            title: '',

          },
          'cpmc-work-type-l': {
            caption: 'Типы ДСЕ',
            title: '',

          },
          'cpmc-machine-l': {
            caption: 'Оборудование',
            title: '',

          },
          'cpmc-tool-l': {
            caption: 'Инструменты',
            title: '',

          },
          'cpmc-material-l': {
            caption: 'Материалы',
            title: '',

          },
          'cpmc-operation-l': {
            caption: 'Операции',
            title: '',

          }
        },
      }
    },

    'edit-form': {
      'save-success-message-caption': 'Сохранение завершилось успешно',
      'save-success-message': 'Объект сохранен',
      'save-error-message-caption': 'Ошибка сохранения',
      'delete-success-message-caption': 'Удаление завершилось успешно',
      'delete-success-message': 'Объект удален',
      'delete-error-message-caption': 'Ошибка удаления'
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
