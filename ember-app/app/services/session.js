import Ember from 'ember';
import config from '../config/environment';

/**
  Сервис "сессий".
  Хранит информацию об аутентифицированном пользователе, и предоставляет методы для аутентификации в приложении и выхода из него.

  @class SessionService
  @extends <a href="http://emberjs.com/api/classes/Ember.Service.html">Ember.Service</a>
*/
export default Ember.Service.extend({
  /**
    Ссылка на сервис работы с cookies.
  */
  cookies: Ember.inject.service('cookies'),

  /**
    Идентификатор аутентифицированного пользователя.

    @property userId
    @type String
    @default null
  */
  userId: null,

  /**
    Имя аутентифицированного пользователя.

    @property userName
    @type String
    @default null
  */
  userName: null,

  /**
    Флаг: аутентифицирован ли какой-либо пользоатель в приложении или нет.

    @property signedIn
    @type Boolean
    @readOnly
  */
  signedIn: Ember.computed('userId', function () {
    return !Ember.isBlank(this.get('userId'));
  }),

  /**
    Обновляет данные об аутентифицированном пользователе сверяя их с пользователем аутинтифицированном на сервере.
    Если на сервере сессия пользователя истекла, то свойство 'userId' в сервисе будет сброшено.

    @method updateFromServer
    @return {<a href="https://emberjs.com/api/ember/2.4/classes/RSVP.Promise">Ember.RSVP.Promise</a>}
    Промис, возвращающий 'userId', если пользователь еще аутентифицирован в приложении.
  */
  updateFromServer() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.run(() => {
        Ember.$.ajax({
          type: 'GET',
          url: `${config.APP.backendUrls.api}/GetAuthenticatedUser()`,
          xhrFields: { withCredentials: true }
        }).then((result) => {
          let userId = this.get('userId');
          if (!result.value || result.value !== userId) {
            userId = null;
            this.set('userId', userId);
            this.set('userName', null);
          }

          resolve(userId);
        }).fail((e) => {
          console.error(`Ошибка обращения к ${config.APP.backendUrls.api}/GetAuthenticatedUser(): ${e.message || e}`);
          reject(e);
        });
      });
    });
  },

  /**
    Проверяет доступны ли аутентифицированному пользователю заданная операция.

    @method checkOperation
    @param {String} operation Операция доступность которой требуется проверить.
    @return {<a href="https://emberjs.com/api/ember/2.4/classes/RSVP.Promise">Ember.RSVP.Promise</a>}
    Промис, возвращающий true, если операция доступна, и false в противном случае.
  */
  checkOperation(operation) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.run(() => {
        Ember.$.ajax({
          type: 'GET',
          url: `${config.APP.backendUrls.api}/CheckOperation(operation='${operation}')`,
          xhrFields: { withCredentials: true }
        }).then((result) => {
          resolve(result.value);
        }).fail((e) => {
          console.error(`Ошибка обращения к ${config.APP.backendUrls.api}/CheckOperation(operation='${operation}'): ${e.message || e}`);
          reject(e);
        });
      });
    });
  },

  /**
    Выполняет аутетификацию пользователя с заданными логином и пролем в приложении..

    @method login
    @param {String} userId Идентификатор пользователя (его логин).
    @param {String} password Пароль пользователя.
    @return {<a href="https://emberjs.com/api/ember/2.4/classes/RSVP.Promise">Ember.RSVP.Promise</a>}
    Промис, возвращающий true, если аутентификация прошла успешно, и false в противном случае.
  */
  login(userId, password) {
    this.set('userId', null);
    this.set('userName', null);

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.run(() => {
        Ember.$.ajax({
          type: 'GET',
          url: `${config.APP.backendUrls.api}/Login(login='${userId}',password='${password}')`,
          xhrFields: { withCredentials: true }
        }).then((result) => {
          if (result.value) {
            //let userInfo = JSON.parse(result.value);
            this.set('userId', result.value);
            // this.set('userName', userInfo.Name);
            resolve(true);
          } else {
            reject(new Error('Неверный логин или пароль.'));
          }
        }).fail((e) => {
          console.error(`Ошибка обращения к ${config.APP.backendUrls.api}/Login(login='${userId}',password='******'): ${e.message || e}`);
          reject(e);
        });
      });
    });
  },

  /**
    Выполняет выход пользователя из приложения.

    @method logout
    @return {<a href="https://emberjs.com/api/ember/2.4/classes/RSVP.Promise">Ember.RSVP.Promise</a>}
    Промис, возвращающий true, если удалось выйти, и false в противном случае.
  */
  logout() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.run(() => {
        Ember.$.ajax({
          type: 'GET',
          xhrFields: { withCredentials: true },
          url: `${config.APP.backendUrls.api}/Logout()`
        }).then((result) => {
          if (result.value) {
            this.set('userId', null);
            this.set('userName', null);
            resolve(result.value);
          } else {
            reject(new Error('Не удалось выйти из приложения.'));
          }
        }).fail((e) => {
          console.error(`Ошибка обращения к ${config.APP.backendUrls.api}/Logout(): ${e.message || e}`);
          reject(e);
        });
      });
    });
  },

  /**
    Инициализирует сервис.
  */
  init() {
    this.set('userId', this.get('cookies').read('user_id'));
    this.set('userName', this.get('cookies').read('user_name'));
  },

  /**
    Отслеживает изменения в свойстве userId и дублирует эти изменения в cookies.

    @method _userIdChanged
    @private
  */
  _userIdChanged: Ember.on('init', Ember.observer('userId', function () {
    this.get('cookies').write('user_id', this.get('userId'));
  })),

  /**
    Отслеживает изменения в свойстве userName и дублирует эти изменения в cookies.

    @method _userNameChanged
    @private
  */
  _userNameChanged: Ember.on('init', Ember.observer('userName', function () {
    this.get('cookies').write('user_name', this.get('userName'));
  }))
});
