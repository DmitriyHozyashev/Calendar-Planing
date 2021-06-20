export default {
  projections: {
    AuditView: {
      dSE: {
        __caption__: 'DSE',
        name: {
          __caption__: 'Name'
        }
      }
    },
    PlanItemE: {
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
};
