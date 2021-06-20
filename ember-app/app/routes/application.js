import Ember from 'ember';
import ModalApplicationRouteMixin from 'ember-flexberry/mixins/modal-application-route';

/**
  Базовый роут всего приложения.

  @class ApplicationRoute
  @uses <a href="https://flexberry.github.io/master/classes/ModalApplicationRoute.html">ModalApplicationRouteMixin</a>
  @extends <a href="http://emberjs.com/api/classes/Ember.Route.html">Ember.Route</a>
*/
export default Ember.Route.extend(ModalApplicationRouteMixin, {
  /**
    Осуществляет рендеринг карты сайта на мастеровую страницу.

    @method renderSitemap
    @param {Object} Структура карты сайта.
  */
  renderSitemap(sitemap) {
    this.render('sitemap', {
      into: 'application',
      outlet: 'sitemap',
      model: sitemap
    });
  },

  /**
    Отслеживает изменения в идентификаторе аутентифицированного пользователя, выполняет построение и ренедринг карты сайта для этого пользователя.

    @method userChanged
  */
  userIdChanged: Ember.observer('session.userId', function() {
    let applicationController = this.controllerFor('application');
    applicationController.createSitemap().then((sitemap) => {
      this.renderSitemap(sitemap);
    });
  }),

  /**
    Устанавливает контроллер для мастеровой страницы.
    [Больше информации](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller Контроллер для мастеровой страницы.
    @param {Object} model Модель для мастеровой страницы.
  */
  setupController(controller, model) {
    this._super(...arguments);

    controller.createSitemap().then((sitemap) => {
      this.renderSitemap(sitemap);
    });
  },

  beforeModel(transition) {
    let session = this.get('session');
    return session.updateFromServer().then(() => {
      if (!session.get('signedIn')) {
        this.transitionTo('login');
      }
    });
  },
});
