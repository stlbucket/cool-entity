const CoolEntity = require('../../src/coolEntity');

const entityInfo = {
  entityName: 'YetAnotherThing',
  entityNamePlural: 'YetAnotherThings',
  fields: {
    stringData: {
      type: 'string'
    },
  }
};

const entityManager = new CoolEntity(entityInfo, {
  verbose: false
});

module.exports = entityManager;