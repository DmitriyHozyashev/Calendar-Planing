import Ember from 'ember';

/**
  Содержит логику, которая при переходе на роут проставляет его название в качестве класса тегу <body>.
  Это позволяет по разному стилизовать отдельные формы приложения.

  @for ApplicationInitializer
  @method routeClassInBodyTag.initialize
  @param {<a href="http://emberjs.com/api/classes/Ember.Application.html">Ember.Application</a>} application Ember-приложение.
*/
export function initialize() {
  Ember.Route.reopen({
    /**
      CSS-класс, который будет проставлен тэгу <body>.
      Если свойство не определено, то в качестве CSS-класса тэгу <body> будет проставлено имя роута.

      @property bodyCssClass
      @type String
      @default null
    */
    bodyCssClass: null,

    /**
      Выполняется при активации роута.
      Добавляет класс с именем роута тегу <body>.

      @method activate
    */
    activate() {
      let cssClass = this.getBodyCssClass();
      if (cssClass !== 'application') {
        Ember.$('body').addClass(cssClass);
      }

      this._super(...arguments);
    },

    /**
      Выполняется при деактивации роута.
      Удаляет класс с именем роута из тега <body>.

      @method activate
    */
    deactivate() {
      Ember.$('body').removeClass(this.getBodyCssClass());

      this._super(...arguments);
    },

    /**
      Получает CSS-класс, который будет проставлен тэгу <body>.

      @method toCssClass
    */
    getBodyCssClass: function () {
      // Берем значение свойства 'bodyCssClass', либо превращаем название текущего рута в название, подходящее для css-класса.
      return this.get('bodyCssClass') || this.routeName.replace(/\./g, '-').dasherize();
    }
  });
}

export default {
  name: 'route-class-in-body-tag',
  initialize
};
