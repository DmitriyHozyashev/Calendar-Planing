export default {
  projections: {
    AuditView: {
      orderMachine: {
        __caption__: 'orderMachine'
      },
      machine: {
        __caption__: 'machine',
        name: {
          __caption__: 'name'
        }
      }
    },
    ProcessOrderItemE: {
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
  }
};
