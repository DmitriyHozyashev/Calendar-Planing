import Ember from 'ember';

/**
  Роут логин-формы.

  @class LoginRoute
  @extends <a href="http://emberjs.com/api/classes/Ember.Route.html">Ember.Route</a>
*/
export default Ember.Route.extend({
  /**
    CSS-класс, который будет проставлен тэгу <body>.
    Если свойство не определено, то в качестве CSS-класса тэгу <body> будет проставлено имя роута.

    @property bodyCssClass
    @type String
    @default 'login-form'
  */
  bodyCssClass: 'login-form',

  /**
    Флаг: показывает должна ли форма помещаться внутрь разметки "мастеровой страницы" application или нет.
    Нужен т.к. у логин-формы полностью своя разметка не использующая разметку "мастеровой".
    Будет проставлен в 'application' контроллер см. initializers/master-page.

    @property noMasterPage
    @type Boolean
    @default false
  */
  hasMasterPage: false,

  /**
    Выполняется одним из первых при переходе к странице.
    Осуществляет проверку того, аутентифицирован ли пользователь, и если - да, то осуществляет переход к стартовой странице.
    [Больше информации](http://emberjs.com/api/classes/Ember.Route.html#method_beforeModel).

    @method beforeModel
    @param {Transition} transition Объект 'transition'.
    @return {Promise} Промис, возвращающий информацию о том аутентифицирован ли пользователь.
  */
  beforeModel() {
    let session = this.get('session');
    return session.updateFromServer().then(() => {
      if (session.get('signedIn')) {
        this.transitionTo('index');
      }
    });
  },

  /**
    Флаг: показывает должна ли форма содержать только основной контент страницы без шапки, футера, и меню сайта.

    @property contentOnly
    @type Boolean
    @default false
  */
  contentOnly: true,

  /**
   Устанавливает контроллер для текущего роута.
    [Больше информации](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller Контроллер формы соответствующей роуту.
    @param {Object} model Модель соответствующая роуту.
    @param {Object} transition Объект transition.
  */
  setupController(controller, model, transition) {
    this._super(...arguments);

    // Берем флаги 'hasMasterPage' и 'contentOnly' из текущего роута и проставляем соответствующему свойству в контроллере 'application'.
    let applicationController = this.controllerFor('application');
    applicationController.set('contentOnly', !!this.get('contentOnly'));
  }
});
