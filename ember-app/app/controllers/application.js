import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Controller.extend({

  /**
    Locales supported by application.

    @property locales
    @type String[]
    @default ['ru', 'en']
  */
  locales: ['ru', 'en'],

  /**
    Флаг: показывает должна ли форма содержать только основной контент страницы без шапки, футера, и меню сайта.
    Инициализируется для каждой формы см. initializers/master-page.

    @property contentOnly
    @type Boolean
    @default false
  */
  contentOnly: false,

  /**
    Handles changes in userSettingsService.isUserSettingsServiceEnabled.

    @method _userSettingsServiceChanged
    @private
  */
  _userSettingsServiceChanged: Ember.observer('userSettingsService.isUserSettingsServiceEnabled', function() {
    this.get('target.router').refresh();
  }),

  /**
    Initializes controller.
  */
  init() {
    this._super(...arguments);

    let i18n = this.get('i18n');
    if (Ember.isNone(i18n)) {
      return;
    }

    // If i18n.locale is long value like 'ru-RU', 'en-GB', ... this code will return short variant 'ru', 'en', etc.
    let shortCurrentLocale = this.get('i18n.locale').split('-')[0];
    let availableLocales = Ember.A(this.get('locales'));

    // Force current locale to be one of available,
    // if browser's current language is not supported by dummy application,
    // or if browser's current locale is long value like 'ru-RU', 'en-GB', etc.
    if (!availableLocales.contains(shortCurrentLocale)) {
      i18n.set('locale', 'en');
    } else {
      i18n.set('locale', shortCurrentLocale);
    }
  },

  /**
    Service that triggers objectlistview events.

    @property objectlistviewEventsService
    @type Service
  */
  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  actions: {
    /**
      Call `updateWidthTrigger` for `objectlistviewEventsService`.

      @method actions.updateWidth
    */
    updateWidth() {
      this.get('objectlistviewEventsService').updateWidthTrigger();
    },

    /**
      Toggles application sitemap's side bar.

      @method actions.toggleSidebar
    */
    toggleSidebar() {
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      sidebar.sidebar('toggle');

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.sidebar.icon.text-menu-show').removeClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').addClass('hidden');
        Ember.$('.bgw-opacity').addClass('hidden');
        Ember.$('.full.height').css({ transition: 'width 0.45s ease-in-out 0s', width: '100%' });
      } else {
        Ember.$('.sidebar.icon.text-menu-show').addClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').removeClass('hidden');
        Ember.$('.bgw-opacity').removeClass('hidden');
        Ember.$('.full.height').css({ transition: 'width 0.3s ease-in-out 0s', width: 'calc(100% - ' + sidebar.width() + 'px)' });
      }
    },

    /**
      Toggles application sitemap's side bar in mobile view.

      @method actions.toggleSidebarMobile
    */
    toggleSidebarMobile() {
      Ember.$('.ui.sidebar.main.menu').sidebar('toggle');

      if (Ember.$('.inverted.vertical.main.menu').hasClass('visible')) {
        Ember.$('.sidebar.icon.text-menu-show').removeClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').addClass('hidden');
        Ember.$('.bgw-opacity').addClass('hidden');
      } else {
        Ember.$('.sidebar.icon.text-menu-show').addClass('hidden');
        Ember.$('.sidebar.icon.text-menu-hide').removeClass('hidden');
        Ember.$('.bgw-opacity').removeClass('hidden');
      }
    },

    /**
      Осуществляет выход текущего пользователя из приложения и переход к логин-форме.

      @method actions.logout
    */
    logout() {
      let session = this.get('session');
      session.logout().then(() => {
        this.transitionToRoute('login');
      });
    }
  },

    /**
    формирует структуру карты сайта, в зависимости от полномочий текущего пользователя.

    @method createSitemap
    @return {Object} Структура карты сайта, сформированная в зависимости от полномочий текущего пользователя.
  */
 createSitemap() {
  let i18n = this.get('i18n');
  let session = this.get('session');
  let sitemap = {
    nodes: [{
      link: 'index',
      caption: i18n.t('forms.application.sitemap.index.caption'),
      title: i18n.t('forms.application.sitemap.index.title'),
      children: null
    }]
  };

  if (!session.get('signedIn')) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      resolve(sitemap);
    });
  }

  return session.updateFromServer().then(result => {

    //Администрирование
    // return session.checkOperation('9a319aeb-746f-4bcf-a9ed-8377d80ffca6');
  }).then(result => {
    // if (result) {
      if (true) {
      sitemap.nodes.push({
        link: null,
        caption: 'Администрирование',
        title: 'Администрирование',
        icon: 'icon cog',
        children: [{
          link: 'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-entity-l',
          caption: i18n.t('forms.application.sitemap.administration.i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-entity-l.caption'),
          title: i18n.t('forms.application.sitemap.administration.i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-entity-l.title'),
          children: null
        }, {
          link: null,
          caption: i18n.t('forms.application.sitemap.полномочия.caption'),
          title: i18n.t('forms.application.sitemap.полномочия.title'),
          children: [{
            link: 'i-c-s-soft-s-t-o-r-m-n-e-t-security-user-l',
            caption: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-user-l.caption'),
            title: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-user-l.title'),
            children: null
          }, {
            link: 'i-c-s-soft-s-t-o-r-m-n-e-t-security-role-l',
            caption: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-role-l.caption'),
            title: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-role-l.title'),
            children: null
          }, {
            link: 'i-c-s-soft-s-t-o-r-m-n-e-t-security-group-l',
            caption: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-group-l.caption'),
            title: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-group-l.title'),
            children: null
          }, {
            link: 'i-c-s-soft-s-t-o-r-m-n-e-t-security-operation-l',
            caption: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-operation-l.caption'),
            title: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-operation-l.title'),
            children: null
          }, {
            link: 'i-c-s-soft-s-t-o-r-m-n-e-t-security-class-l',
            caption: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-class-l.caption'),
            title: i18n.t('forms.application.sitemap.полномочия.i-c-s-soft-s-t-o-r-m-n-e-t-security-class-l.title'),
            children: null
          }]
        }]
        });
    }

    return sitemap;
  }).then(() => {
    // TODO: Проверить права на доступ к справочникам.
    sitemap.nodes.push({
      link: null,
      caption: i18n.t('forms.application.sitemap.планирование.caption'),
      title: i18n.t('forms.application.sitemap.планирование.title'),
      children: [{
        link: 'cpmc-plan-l',
        caption: i18n.t('forms.application.sitemap.планирование.cpmc-plan-l.caption'),
        title: i18n.t('forms.application.sitemap.планирование.cpmc-plan-l.title'),
        children: null
      }, {
        link: 'cpmc-d-s-e-l',
        caption: i18n.t('forms.application.sitemap.планирование.cpmc-d-s-e-l.caption'),
        title: i18n.t('forms.application.sitemap.планирование.cpmc-d-s-e-l.title'),
        children: null
      }, {
        link: 'cpmc-process-order-l',
        caption: i18n.t('forms.application.sitemap.планирование.cpmc-process-order-l.caption'),
        title: i18n.t('forms.application.sitemap.планирование.cpmc-process-order-l.title'),
        children: null
      }]
    }, {
      link: null,
      caption: i18n.t('forms.application.sitemap.справочники.caption'),
      title: i18n.t('forms.application.sitemap.справочники.title'),
      children: [{
        link: 'cpmc-unit-metr-l',
        caption: i18n.t('forms.application.sitemap.справочники.cpmc-unit-metr-l.caption'),
        title: i18n.t('forms.application.sitemap.справочники.cpmc-unit-metr-l.title'),
        children: null
      }, {
        link: 'cpmc-work-type-l',
        caption: i18n.t('forms.application.sitemap.справочники.cpmc-work-type-l.caption'),
        title: i18n.t('forms.application.sitemap.справочники.cpmc-work-type-l.title'),
        children: null
      }, {
        link: 'cpmc-machine-l',
        caption: i18n.t('forms.application.sitemap.справочники.cpmc-machine-l.caption'),
        title: i18n.t('forms.application.sitemap.справочники.cpmc-machine-l.title'),
        children: null
      }, {
        link: 'cpmc-tool-l',
        caption: i18n.t('forms.application.sitemap.справочники.cpmc-tool-l.caption'),
        title: i18n.t('forms.application.sitemap.справочники.cpmc-tool-l.title'),
        children: null
      }, {
        link: 'cpmc-material-l',
        caption: i18n.t('forms.application.sitemap.справочники.cpmc-material-l.caption'),
        title: i18n.t('forms.application.sitemap.справочники.cpmc-material-l.title'),
        children: null
      }, {
        link: 'cpmc-operation-l',
        caption: i18n.t('forms.application.sitemap.справочники.cpmc-operation-l.caption'),
        title: i18n.t('forms.application.sitemap.справочники.cpmc-operation-l.title'),
        children: null
      }]
    });

    return sitemap;
  });
}
});
