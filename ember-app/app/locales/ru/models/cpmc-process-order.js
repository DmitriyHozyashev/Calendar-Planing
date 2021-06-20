export default {
  projections: {
    AuditView: {
      name: {
        __caption__: ''
      },
      processOrderItem: {
        __caption__: 'Process order item',
        orderMachine: {
          __caption__: 'Order machine'
        },
        machine: {
          __caption__: 'Machine',
          name: {
            __caption__: 'Name'
          }
        }
      }
    },
    ProcessOrderE: {
      name: {
        __caption__: 'Наименование'
      },
      processOrderItem: {
        __caption__: 'Оборудование',
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
    },
    ProcessOrderL: {
      name: {
        __caption__: 'Наименование'
      }
    }
  }
};
