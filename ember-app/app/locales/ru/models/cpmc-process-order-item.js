export default {
  projections: {
    AuditView: {
      orderMachine: {
        __caption__: 'Order machine'
      },
      machine: {
        __caption__: 'Machine',
        name: {
          __caption__: 'Name'
        }
      }
    },
    ProcessOrderItemE: {
      orderMachine: {
        __caption__: 'Порядок'
      },
      machine: {
        __caption__: 'Оборудование',
        code: {
          __caption__: ''
        },
        name: {
          __caption__: 'Наименование оборудования'
        }
      }
    }
  }
};
