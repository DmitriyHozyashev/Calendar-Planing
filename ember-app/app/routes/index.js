import Ember from 'ember';

export default Ember.Route.extend({
  /**
    Флаг: показывает должна ли форма содержать только основной контент страницы без шапки, футера, и меню сайта.

    @property contentOnly
    @type Boolean
    @default false
  */
 contentOnly: false,

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
 },

  /**
    Выполняется одним из первых при переходе к странице.
    Осуществляет проверку того, аутентифицирован ли пользователь, и если - нет, то осуществляет переход к логин-форме.
    [Больше информации](http://emberjs.com/api/classes/Ember.Route.html#method_beforeModel).

    @method beforeModel
    @param {Transition} transition Объект 'transition'.
    @return {Promise} Промис, возвращающий информацию о том аутентифицирован ли пользователь.
  */
  beforeModel(transition) {
    let session = this.get('session');
    return session.updateFromServer().then(() => {
      if (!session.get('signedIn')) {
        this.transitionTo('login');
      }
    });
  },
});
