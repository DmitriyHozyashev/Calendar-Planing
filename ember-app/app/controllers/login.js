import Ember from 'ember';

/**
  Коннтрллер логин-формы.

  @class LoginController
  @extends <a href="http://emberjs.com/api/classes/Ember.Controller.html">Ember.Controller</a>
*/
export default Ember.Controller.extend({
  /**
    Логин пользователя.

    @property login
    @type String
    @default null
  */
  login: null,

  /**
    Пароль пользователя.

    @property password
    @type String
    @default null
  */
  password: null,

  /**
    Флаг: показывает валиден ли логин пользователя.

    @property loginIsInvalid
    @type Boolean
    @default false
  */
  loginIsInvalid: false,

  /**
    Флаг: показывает валиден ли пароль пользователя.

    @property passwordIsInvalid
    @type Boolean
    @default false
  */
  passwordIsInvalid: false,

  /**
    Флаг: показывает осуществляется ли сейчас попытка входа.

    @property loginIsInProcess
    @type Boolean
    @default false
  */
  loginIsInProcess: false,

  /**
    Флаг: показывает успешна ли была последняя попытка входа.

    @property loginFailed
    @type Boolean
    @default false
  */
  loginFailed: false,

  /**
    Сообщение об ошибке при последней попытке входа.

    @property loginErrorMessage
    @type String
    @default null
  */
  loginErrorMessage: null,

  actions: {
    /**
      Обработчик события 'change' input-а для ввода логина.

      @method actions.onLoginChange
    */
    onLoginChange() {
      this.validateLogin();
    },

    /**
      Обработчик события 'change' input-а для ввода пароля.

      @method actions.onPasswordChange
    */
    onPasswordChange() {
      this.validatePassword();
    },

    /**
      Обработчик события 'submit' логин-формы.

      @method onLoginFormSubmit.login
    */
    onLoginFormSubmit() {
      this.validateLogin();
      this.validatePassword();
      if (this.get('loginIsInvalid') || this.get('passwordIsInvalid')) {
        return;
      }

      this.set('loginIsInProcess', true);
      this.set('loginFailed', false);
      this.set('loginErrorMessage', null);
      this.get('session').login(this.get('login'), this.get('password')).then((result) => {
        this.set('loginIsInProcess', false);
        this.transitionToRoute('index');
      }).catch((e) => {
        this.set('loginIsInProcess', false);
        this.set('loginFailed', true);
        this.set('loginErrorMessage', e.message || e);
      });
    }
  },

  /**
    Осуществляет валидацию введенного логина.
    Отображает ошибку валидации, если логин не валиден.

    @method validateLogin
  */
  validateLogin() {
    this.set('loginIsInvalid', Ember.isBlank(this.get('login')));
  },

  /**
    Осуществляет валидацию введенного пароля.
    Отображает ошибку валидации, если пароль не валиден.

    @method validatePassword
  */
  validatePassword() {
    this.set('passwordIsInvalid', Ember.isBlank(this.get('password')));
  },
});
