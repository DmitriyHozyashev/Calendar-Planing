import { createEnum } from 'ember-flexberry-data/utils/enum-functions';

export default createEnum({
  All: 'Наилучший вариант',
  Jonson: 'Алгоритм Джонсона',
  Front: 'Фронтальный алгоритм',
  NEH: 'Эвристика NEH',
  Lex: 'Лексикографический алгоритм'
});
