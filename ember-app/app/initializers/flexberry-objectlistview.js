import Ember from 'ember';
import ODataQueryAdapter from 'ember-flexberry-data/query/odata-adapter';
import FlexberryObjectlistviewComponent from 'ember-flexberry/components/flexberry-objectlistview';
import ColsconfigDialogContentComponent from 'ember-flexberry/components/colsconfig-dialog-content';
import ListFormRoute from 'ember-flexberry/routes/list-form';
import ListFormController from 'ember-flexberry/controllers/list-form';
import FlexberryLookupMixin from 'ember-flexberry/mixins/flexberry-lookup-controller';
import EditFormController from 'ember-flexberry/controllers/edit-form';
// import confirmDialogYesNo from '../utils/confirmDialog';
/**
  Инициализирует некоторые настройки компонента flexberry-objectlistview для всех его экземпляров в приложении.

  @for ApplicationInitializer
  @method FlexberryObjectlistview.initialize
  @param {<a href="http://emberjs.com/api/classes/Ember.Application.html">Ember.Application</a>} application Ember-приложение.
*/
export function initialize() {
  FlexberryObjectlistviewComponent.reopen({
    init() {
      this._super(...arguments);

      //т.к beforeDeleteRecord почему-то вызывается без контекста, то привяжем контекст принудительно
      // this.beforeDeleteRecord = this.get('beforeDeleteRecord').bind(this);
    },

    /**
      Ссылка на элемент разметки, предстявляющий собой кнопку отображения/сокрытия панели поиска.

      @property _$searchPanelShowHideButton
      @type Object
      @default null
      @private
    */
    _$searchPanelShowHideButton: null,

    /**
      Ссылка на элемент разметки, предстявляющий собой чекбокс поиска по подстроке на панели поиска.

      @property _$searchPanelCheckbox
      @type Object
      @default null
      @private
    */
    _$searchPanelCheckbox: null,

    /**
      Массив CSS-классов для <div>-блока являющегося оберткой компонента.
      Любой дополнительный CSS-класс может быть добавлен через свойство 'class' компонента.

      @example
        ```handlebars
        {{flexberry-objectlistview
          class="my-css-class"
        }}
        ```
      @property classNames
      @type String[]
      @default ['flexberry-objectlistview']
    */
    classNames: ['flexberry-objectlistview'],

    /**
      Флаг: показывает доступно ли изменение размеров колонок.

      @property allowColumnResize
      @type Boolean
      @default true
    */
    allowColumnResize: true,

    /**
      Флаг: показывает должен ли происходить автоматический перарсчет ширины колонок, в случае каких-либо изменений связанных с шириной.
      Так же принудительно растягивает flexberry-objectlistview на всю ширину родительского элемента.

      @property columnsWidthAutoresize
      @type Boolean
      @default true
    */
    columnsWidthAutoresize: true,

    /**
      Флаг: показывает должна ли на панели пейджинга отображаться информация о том сколко записей и из скольки сейчас отображены.

      @property showShowingEntries
      @type Boolean
      @default true
    */
    showShowingEntries: true,

    /**
      Флаг: показывает должен ли отображаться checkbox в каждой строке.

      @property showCheckBoxInRow
      @type Boolean
      @default true
    */
    showCheckBoxInRow: true,

    /**
      Флаг: показывает должна ли отображаться кнопка удаления в каждой строке.

      @property showDeleteButtonInRow
      @type Boolean
      @default true
    */
    showDeleteButtonInRow: true,

    /**
      Флаг: показывает должна ли отображаться кнопка редактирования в каждой строке.

      @property showEditButtonInRow
      @type Boolean
      @default true
    */
    showEditButtonInRow: true,

    /**
      Флаг: показывает разрешене ли сортировка при клике на заголовки колонок.

      @property orderable
      @type Boolean
      @default true
    */
    orderable: true,

    /**
      Флаг: показывает будет ли в тулбаре отображаться кнопка создания новой записи.

      @property createNewButton
      @type Boolean
      @default true
    */
    createNewButton: true,

    /**
      Флаг: показывает будет ли в тулбаре отображаться кнопка обновления списка.

      @property refreshButton
      @type Boolean
      @default true
    */
    refreshButton: true,

    /**
      Флаг: показывает будет ли в тулбаре отображаться кнопка удаления выбранных записей.

      @property deleteButton
      @type Boolean
      @default true
    */
    deleteButton: true,

    /**
      Флаг: показывает будет ли в тулбаре отображаться кнопка пользовательских настроек.

      @property colsConfigButton
      @type Boolean
      @default true
    */
    colsConfigButton: true,

    /**
      Флаг: показывает будет ли в тулбаре отображаться кнопка экспорта в excel.

      @property exportExcelButton
      @type Boolean
      @default true
    */
    exportExcelButton: true,

    /**
      Флаг: показывает будет ли в тулбаре отображаться кнопка фильтрации.

      @property filterButton
      @type Boolean
      @default true
    */
    filterButton: true,

    /**
      Флаг: показывает включена ли фильтрация.

      @property enableFilters
      @type Boolean
      @default true
    */
    enableFilters: true,

    /**
      Флаг: показывает включена ли фильтрация по совпадению с любым из введенных слов.

      @property filterByAnyWord
      @type Boolean
      @default true
    */
    filterByAnyWord: true,

    /**
      Флаг: показывает включена ли фильтрация по совпадению со всеми введенными словами.

      @property filterByAllWords
      @type Boolean
      @default false
    */
    filterByAllWords: false,

    /**
      Primise выполняемой проверки на удаление.

      @property beforeDelPromise
      @type Promise
      @default null
    */
    beforeDelPromise: null,

    /**
      Возвращает локализованные условия для фильтров.
      Обработку локализованных условий смотри в ListFormRoute (initializers/list-form.js)

      @function conditionsByType
      @param {String} type Имя типа
      @returns {Array} Массив доступных условий
    */
    conditionsByType(type) {
      switch (type) {
        case 'file':
          return null;
        case 'date':
        case 'number':
          return ['=', '≠', '≤', '≥'];
        case 'string':
          return ['=', '≠', 'По подстроке'];
        case 'boolean':
          return ['='];
        default:
          return ['=', '≠'];
      }

    },

    /**
     * Return object with parameters for component.
     *
     * @method _getFilterComponent
     * @param {string} type
     * @param {Boolean} relation
     * @return {Object} Object with parameters for component.
     */
    componentForFilter(type, relation) {
      if (type === 'boolean') {
        return { properties: { items: ['да', 'нет'] } };
      }

      return {};
    },

    actions: {

      /**
        Отображает/скрывает инструмент фильтрации.

        @method actions.toggleStateFilters
      */
      toggleStateFilters() {
        this._super(...arguments);

        Ember.run.scheduleOnce('afterRender', this, '_renderFilters');
      },

      /**
        Применяет фильтры к списку.

        @method actions.applyFilters
      */
      applyFilters() {
        // Т.к. мы не можем явно передать обработчики этих action-ов через hbs-шаблоны списковых форм из аддонов типа flexberry-security,
        // а без них не будет работать фильтрация и поиск, то просто вызываем их руками прямо из контроллера.
        let currentController = this.get('currentController');
        let applyFilters = currentController.get('actions.applyFilters');
        if (Ember.typeOf(applyFilters) !== 'function') {
          this._super(...arguments);

          return;
        }

        applyFilters.apply(currentController, arguments);
      },

      /**
        Сбрасывает фильтры у списка.

        @method actions.applyFilters
      */
      resetFilters() {
        // Т.к. мы не можем явно передать обработчики этих action-ов через hbs-шаблоны списковых форм из аддонов типа flexberry-security,
        // а без них не будет работать фильтрация и поиск, то просто вызываем их руками прямо из контроллера.
        let currentController = this.get('currentController');
        let resetFilters = currentController.get('actions.resetFilters');
        if (Ember.typeOf(resetFilters) !== 'function') {
          this._super(...arguments);

          return;
        }

        resetFilters.apply(currentController, arguments);
      },

      /**
        Осуществляет поиск по подстроке на списке.

        @method actions.filterByAnyMatch
      */
      filterByAnyMatch() {
        // Т.к. мы не можем явно передать обработчики этих action-ов через hbs-шаблоны списковых форм из аддонов типа flexberry-security,
        // а без них не будет работать фильтрация и поиск, то просто вызываем их руками прямо из контроллера.
        let currentController = this.get('currentController');
        let filterByAnyMatch = currentController.get('actions.filterByAnyMatch');
        if (Ember.typeOf(filterByAnyMatch) !== 'function') {
          this._super(...arguments);

          return;
        }

        filterByAnyMatch.apply(currentController, arguments);
      },

      /**
        Устанавливает доступность иерархического режима.

        @method actions.availableHierarchicalMode
        @param {String} hierarchicalAttribute Имя атрибута, по которому будет строиться иерархия.
      */
      availableHierarchicalMode(hierarchicalAttribute) {
        // Временно переопределяем обработчик action-а, чтобы иерархический режим не включался сам собой на списках, отображающих модели с иерархиями.
      }
    },

    /**
      Инициализирует свойства компонента связанные с его разметкой в DOM.
    */
    didInsertElement() {
      this._super(...arguments);

      // Находим тулбар и проставляем ему дополнительный класс.
      let $toolbar = this.$('>.ui.menu').first();
      $toolbar.addClass('flexberry-objectlistview-toolbar');

      // Меняем всплывающую подсказку у кнопки обновления.
      let $refreshButton = Ember.$('>button.refresh-button', $toolbar);
      $refreshButton.attr('title', 'Обновить список');
      $refreshButton.detach();

      // Меняем всплывающую подсказку у кнопки добавления.
      let $createButton = Ember.$('>button.create-button', $toolbar);
      $createButton.attr('title', 'Добавить новую запись');
      $createButton.detach();

      // Меняем всплывающую подсказку у кнопки удаления.
      let $deleteButton = Ember.$('>button.delete-button', $toolbar);
      $deleteButton.attr('title', 'Удалить выбранные записи');
      $deleteButton.detach();

      // Меняем всплывающую подсказку у кнопки настройки отображения столбцов.
      // Перемещаем кнопку настройки отображения столбцов таким образом, чтобы она следовала за кнопкой удаления.
      let $columnsConfigButton = Ember.$('>.ui.buttons.cols-config', $toolbar);
      Ember.$('>button.config-button', $columnsConfigButton).attr('title', 'Настроить отображение столбцов');
      $columnsConfigButton.detach();

      // Меняем всплывающую подсказку у кнопки экспорта в excel.
      // Перемещаем кнопку экспорта в excel таким образом, чтобы она следовала за кнопкой настройки отображения столбцов.
      let $exportConfigButton = Ember.$('>.ui.buttons.export-config', $toolbar);
      Ember.$('>button.export-button', $exportConfigButton).attr('title', 'Экспорт в Excel');
      $exportConfigButton.detach();

      // Меняем всплывающую подсказку у кнопки фильтрации.
      // Перемещаем кнопку фильтрации таким образом, чтобы она следовала за кнопкой экспорта в excel.
      let $filterButton = Ember.$('>.ui.buttons.filter-active', $toolbar);
      Ember.$('>button', $filterButton).attr('title', 'Фильтровать записи');
      $filterButton.detach();

      // Скрываем панель поиска и помещаем её после тулбара.
      let $searchPanel = this.$('.search-button').closest('.ui.action.input');
      $searchPanel.addClass('search-panel hidden');
      $searchPanel.detach().insertAfter($toolbar);

      // А в тулбар помещаем кнопку, по нажатию на которую панель поиска будет отображаться/скрываться.
      let $searchPanelShowHideButton = Ember.$(
        '<button class="ui icon button search-panel-show-hide-button" title="Поиск записей">' +
        '<i class="search icon"></i>' +
        '</button>');
      $searchPanelShowHideButton.on('click', (event) => {
        event.preventDefault();
        $searchPanel.toggleClass('hidden');
      });

      // Помещаем кнопки в тулбар в нужном порядке (вставляем в начало, т.к. в кноце тулбара находятся кастомные кнопки и их порядок не нужно нарушать).
      $searchPanelShowHideButton.prependTo($toolbar);
      $filterButton.prependTo($toolbar);
      $exportConfigButton.prependTo($toolbar);
      $columnsConfigButton.prependTo($toolbar);
      $deleteButton.prependTo($toolbar);
      $createButton.prependTo($toolbar);
      $refreshButton.prependTo($toolbar);

      // Убираем placeholder у поля ввода.
      let $searchPanelInput = Ember.$('input', $searchPanel);
      $searchPanelInput.addClass('search-input');
      $searchPanelInput.attr('placeholder', '');

      // Добавляем подпись перед input-ом.
      let $searchPanelLabel = Ember.$('<span class="search-label">Что искать</span>');
      $searchPanelLabel.insertBefore($searchPanelInput);

      // Добавляем чекбокс поиска по подстроке после input-а.
      let $searchPanelCheckbox = Ember.$(
        '<div class="flexberry-checkbox ui checkbox search-by-any-word-checkbox">' +
        '<input class="flexberry-checkbox-input hidden" tabindex="0" type="checkbox">' +
        '<label class="flexberry-checkbox-label">По подстроке</label>' +
        '</div>');
      $searchPanelCheckbox.on('change', () => {
        let filterByAnyWord = $searchPanelCheckbox.is(':checked');
        this.set('filterByAnyWord', filterByAnyWord);
        this.set('filterByAllWords', !filterByAnyWord);
      });
      $searchPanelCheckbox.insertAfter($searchPanelInput);
      $searchPanelCheckbox.checkbox();
      if (this.get('filterByAnyWord')) {
        $searchPanelCheckbox.checkbox('check');
      }

      // Находим панель пэйджинга и проставляем её элементам дополнительные CSS-классы.
      let $pagingPanel = this.$('.object-list-view-container + .ui.menu').first();
      $pagingPanel.addClass('paging-panel');
      Ember.$('>.ui.buttons', $pagingPanel).addClass('pages-menu');
      Ember.$('>.right.menu', $pagingPanel).addClass('per-page-menu');

      this.set('_$searchPanelShowHideButton', $searchPanelShowHideButton);
      this.set('_$searchPanelCheckbox', $searchPanelCheckbox);
    },

    /**
      Выполняется после каждого ренеринга компонента или его частей.
    */
    didRender() {
      this._super(...arguments);

      Ember.run.scheduleOnce('afterRender', this, '_renderPagers');
      Ember.run.scheduleOnce('afterRender', this, '_renderFilters');
      Ember.run.scheduleOnce('afterRender', this, '_sendRenderAction');
    },

    /**
      Деинициализирует свойства компонента связанные с его разметкой в DOM.
    */
    willDestroyElement() {
      let $searchPanelShowHideButton = this.get('_$searchPanelShowHideButton');
      $searchPanelShowHideButton.off('click');
      $searchPanelShowHideButton.remove();
      this.set('_$searchPanelShowHideButton', null);

      let $searchPanelCheckbox = this.get('_$searchPanelCheckbox');
      $searchPanelCheckbox.checkbox('destroy');
      $searchPanelCheckbox.off('change');
      $searchPanelCheckbox.remove();
      this.set('_$searchPanelCheckbox', null);

      this._super(...arguments);
    },

    /**
      Осуществляет рендеринг пэйджеров.

      @method _renderFilters
      @private
    */
    _renderPagers() {
      // Удаляем ранее продублированую панель пэйджинга из тулбара.
      let $toolbar = this.$('.flexberry-objectlistview-toolbar');
      Ember.$('.pages-menu', $toolbar).remove();

      // Находим оригинальную панель пэйджинга.
      let $pagingPanel = this.$('.paging-panel');
      let $pagesMenu = Ember.$('.pages-menu', $pagingPanel);
      let $perPageMenu = Ember.$('.per-page-menu', $pagingPanel);

      // Перемещаем кнопки так, чтобы кнопки с номерами страниц оказались после кнопки перехода к следующей странице.
      let $prevPageButton = Ember.$('button.prev-page-button', $pagesMenu);
      let $nextPageButton = Ember.$('button.next-page-button', $pagesMenu);
      $nextPageButton.detach().insertAfter($prevPageButton);

      // Перемещаем информацию о количестве отображенных записей так, чтобы она оказалась после кнопки перехода к следующей странице.
      // Ранее перемещенный блок с информацией предварительно удаляем из разметки.
      let $showingEntries = Ember.$('.showing-entries', $perPageMenu).clone();
      Ember.$('.showing-entries', $pagesMenu).remove();
      $showingEntries.insertAfter($nextPageButton);

      // Добавляем подпись для выпадающего списка количества записей на странице.
      // Ранее добавленную подпись удаляем из разметки.
      let $perPageDropdownLabel = Ember.$('<span class="per-page-dropdown-label">Строк:</span>');
      let $perPageDropdown = Ember.$('.flexberry-dropdown', $perPageMenu);
      Ember.$('.per-page-dropdown-label', $perPageMenu).remove();
      $perPageDropdownLabel.insertBefore($perPageDropdown);

      // Добавляем подпись для поля перехода к заданной странице.
      // Ранее добавленную подпись удаляем из разметки.
      let $goToPageInputLabel = Ember.$('<span class="go-to-page-input-label">перейти:</span>');
      Ember.$('.go-to-page-input-label', $pagesMenu).remove();
      $goToPageInputLabel.insertAfter($showingEntries);

      // Добавляем поле перехода к заданной странице.
      // Ранее добавленное поле удаляем из разметки.
      let $goToPageInput = Ember.$('<input type="text" class="go-to-page-input" />');
      Ember.$('.go-to-page-input', $pagesMenu).off('keypress').remove();
      $goToPageInput.on('keypress', (e) => {
        let $input = Ember.$(e.target);
        let charCode = e.which ? e.which : e.keyCode;
        if (charCode === 13) {
          let pages = this.get('pages');
          let currentPageNumber = Ember.get(pages.find((page) => { return page.isCurrent; }) || {}, 'number');
          let lastPageNumber = Ember.get(pages[pages.length - 1] || {}, 'number');

          let pageNumber = Number.parseInt($input.val(), 10);
          if (isNaN(pageNumber) || pageNumber <= 0 || pageNumber > lastPageNumber) {
            pageNumber = 1;
          }

          if (pageNumber === currentPageNumber) {
            $input.val('');
          } else {
            this.send('gotoPage', this.attrs.gotoPage, pageNumber);
          }
        } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
      });
      $goToPageInput.insertAfter($goToPageInputLabel);

      // Дублируем панель пэйджинга в тулбаре.
      $pagesMenu.clone(true).appendTo($toolbar);

      // Меняем местами кнопки в строках.
      this.$('.object-list-view-helper-column-cell').each(function() {
        let $cell = Ember.$(this);
        let $checkboxWrapper = Ember.$('.flexberry-checkbox', $cell).parent();
        let $editButtonWrapper = Ember.$('.object-list-view-row-edit-button', $cell).parent();

        // Помещаем кнопку редактирования записи сразу после чекбокса.
        if ($checkboxWrapper.length > 0 && $editButtonWrapper.length > 0) {
          $editButtonWrapper.detach().insertAfter($checkboxWrapper);
        }
      });
    },

    /**
      Осуществляет рендеринг вспомогательных строк таблицы для инструмента фильтрации.

      @method _renderFilters
      @private
    */
    _renderFilters() {
      if (!this.get('_showFilters')) {
        return;
      }

      // Добавляем дополнительные классы строкам инструмента фильтрации, чтобы их можно было стилизовать.
      let $firstFilterRow = this.$('tbody tr:first-child');
      $firstFilterRow.addClass('filter-tool-operations');

      let $secondFilterRow = $firstFilterRow.next('tr');
      $secondFilterRow.addClass('filter-tool-values');

      // Добавляем в первую ячейку первой строки кнопку сброса фильтров.
      let $resetFilterButton = Ember.$('<button class="reset-filter-button" title="Очистить условия фильтрации" />');
      $resetFilterButton.on('click', () => {
        this.send('resetFilters');
      });
      $resetFilterButton.appendTo(Ember.$('td:first-child', $firstFilterRow));
    },

    /**
      Посылает action, сообщающий о том, что рендеринг компонента завершился.

      @method _sendRenderAction
      @private
    */
    _sendRenderAction() {
      this.sendAction('objectListViewDidRender', {
        target: this.$(),
        content: this.get('content')
      });
    },

    // beforeDeleteRecord(record, data) {
    //   let promise = this.get('beforeDelPromise');
    //   if (!promise) {
    //     promise = confirmDialogYesNo('Подтвердите удаление', 'Удалить выбранные записи?')
    //       .finally(() => {
    //         this.set('beforeDelPromise', null);
    //       });
    //     this.set('beforeDelPromise', promise);
    //   }

    //   promise.then((value) => { data.cancel = value === false; });

    //   return promise;
    // }
  });

  ColsconfigDialogContentComponent.reopen({
    actions: {
      /**
        Осуществляет применение пользовательских настроек для колонок flexberry-objectlistview и экспорт в excel.

        @method actions.apply
      */
      apply() {
        if (!this.exportParams.isExportExcel) {
          this._super(...arguments);

          return;
        }

        // Переопределяем часть логики, которая отвечает за эуспорт в excel т.к. станлартная логика почему-то не отправляет cookies в запросе,
        // из-за чего сервер не получает информацию о пользователе и возвращает ошибку.
        // TODO: разобраться в причинах и отказаться от переопределения этой логики.
        let store = this.get('store.onlineStore') || this.get('store');
        let adapter = store.adapterFor(this.modelName);
        let currentQuery = this._getCurrentQuery();
        let url = adapter._buildURL(currentQuery.modelName);
        let builder = new ODataQueryAdapter(url, store);
        let data = builder.getODataQuery(currentQuery);
        if (adapter.sortQueryParams) {
          data = adapter.sortQueryParams(data);
        }

        let exportToExcelPromise = new Ember.RSVP.Promise((resolve, reject) => {
          Ember.run(() => {
            Ember.$.ajax({
              url: url,
              data: data,
              type: 'GET',
              xhrFields: { withCredentials: true },
              dataType: 'binary',
            }).then((result) => {
              resolve(result);
            }).fail((e) => {
              reject(e);
            });
          });
        });

        let objectlistviewEventsService = this.get('objectlistviewEventsService');
        objectlistviewEventsService.setLoadingState('loading');

        exportToExcelPromise.then((result) => {
          let blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          let anchor = Ember.$('.download-anchor');
          if (!Ember.isBlank(anchor)) {
            if (window.navigator.msSaveOrOpenBlob) {
              let downloadFunction = function() {
                window.navigator.msSaveOrOpenBlob(blob, 'list.xlsx');
              };

              anchor.on('click', downloadFunction);
              anchor.get(0).click();
              anchor.off('click', downloadFunction);
            } else {
              let downloadUrl = URL.createObjectURL(blob);
              anchor.prop('href', downloadUrl);
              anchor.prop('download', 'list.xlsx');
              anchor.get(0).click();
            }
          }

          objectlistviewEventsService.setLoadingState('');
        }).catch((e) => {
          objectlistviewEventsService.setLoadingState('');
          this.sendAction('close');
          this.currentController.send('handleError', e);
        });
      }
    }
  });

  // Даем возможность задавать кастомные ограничений списка из спискового контроллера.
  ListFormRoute.reopen({
    /**
      Задает ограничение для списка.

      @method objectListViewLimitPredicate
      @param {Object} options Опции метода.
      @param {String} [options.modelName] Имя загружаемой модели.
      @param {String} [options.projectionName] Имя представления, используемого для загрузки.
      @param {String} [options.params] URL-параметры роута.
      @return {BasePredicate} Предикат, ограничивающий загружаемые данные.
    */
    objectListViewLimitPredicate(options) {
      // Пытаемся найти и вызвать аналогичный метод 'objectListViewLimitPredicate' в контроллере формы.
      let controller = this.controllerFor(this.routeName) || {};
      let objectListViewLimitPredicate = Ember.get(controller, 'objectListViewLimitPredicate');
      if (Ember.typeOf(objectListViewLimitPredicate) === 'function') {
        return objectListViewLimitPredicate.apply(controller, arguments);
      }
    }
  });

  // Даем возможность работать с лукапами на списковых формах.
  ListFormController.reopen(FlexberryLookupMixin, {
    /**
      Ссылка на контроллер лукапов.
    */
    lookupController: Ember.inject.controller('lookup-dialog'),

    /**
      Инициализирует контроллер.
    */
    init() {
      this._super(...arguments);

      let editFormController = EditFormController.create();
      let lookupSettings = editFormController.get('lookupSettings');
      this.set('lookupSettings', lookupSettings);

      editFormController.destroy();
    }
  });
}

export default {
  name: 'flexberry-objectlistview',
  initialize
};
