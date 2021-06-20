export default {
  projections: {
    AuditView: {
      name: {
        __caption__: 'name'
      },
      processOrderItem: {
        __caption__: 'processOrderItem',
        orderMachine: {
          __caption__: 'orderMachine'
        },
        machine: {
          __caption__: 'machine',
          name: {
            __caption__: 'name'
          }
        }
      }
    },
    ProcessOrderE: {
      name: {
        __caption__: 'name'
      },
      processOrderItem: {
        __caption__: 'processOrderItem',
        orderMachine: {
          __caption__: 'orderMachine'
        },
        machine: {
          __caption__: 'machine',
          code: {
            __caption__: 'code'
          },
          name: {
            __caption__: 'name'
          }
        }
      }
    },
    ProcessOrderL: {
      name: {
        __caption__: 'name'
      }
    }
  }
};
