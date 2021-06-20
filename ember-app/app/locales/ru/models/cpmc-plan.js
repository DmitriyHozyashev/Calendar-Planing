export default {
  projections: {
    AuditView: {
      name: {
        __caption__: 'Name'
      },
      algorithm: {
        __caption__: 'Algorithm'
      },
      totalTime: {
        __caption__: 'Total time'
      },
      state: {
        __caption__: 'State'
      },
      planItem: {
        __caption__: 'Plan item',
        dSE: {
          __caption__: 'DSE',
          name: {
            __caption__: 'Name'
          }
        }
      }
    },
    PlanE: {
      name: {
        __caption__: 'Наименование'
      },
      state: {
        __caption__: 'Состояние'
      },
      algorithm: {
        __caption__: 'Алгоритм вычисления'
      },
      totalTime: {
        __caption__: 'Общее время'
      },
      planItem: {
        __caption__: 'Строка плана',
        dSE: {
          __caption__: 'Код',
          code: {
            __caption__: ''
          },
          name: {
            __caption__: 'Наименование'
          },
          processOrder: {
            __caption__: '',
            name: {
              __caption__: 'Порядок обработки'
            }
          }
        }
      }
    },
    PlanL: {
      name: {
        __caption__: 'Наименование'
      },
      state: {
        __caption__: 'Состояние'
      },
      algorithm: {
        __caption__: 'Алгоритм вычисления'
      },
      totalTime: {
        __caption__: 'Общее время'
      },
      createTime: {
        __caption__: 'Дата создания'
      },
      creator: {
        __caption__: 'Создатель'
      },
      editTime: {
        __caption__: 'Дата редактрвоания'
      },
      editor: {
        __caption__: 'Редактор'
      },
      planItem: {
        __caption__: '',
        dSE: {
          __caption__: 'Код',
          code: {
            __caption__: ''
          },
          name: {
            __caption__: 'Наименование'
          },
          processOrder: {
            __caption__: '',
            name: {
              __caption__: 'Порядок обработки'
            }
          }
        }
      }
    }
  }
};
