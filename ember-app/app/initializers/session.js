/**
  Внедряет 'session'-сервис в доступные роуты, контроллеры, компоненты и хэлперы.

  @for ApplicationInitializer
  @method session.initialize
  @param {<a href="http://emberjs.com/api/classes/Ember.Application.html">Ember.Application</a>} application Ember-приложение.
*/
export function initialize(application) {
  [
    'component',
    'controller',
    'route',
    'helper'
  ].forEach(type => {
    application.inject(type, 'session', 'service:session');
  });
}

export default {
  name: 'session',
  initialize
};
