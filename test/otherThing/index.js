const CoolEntity = require('../../src/coolEntity');

const entityInfo = {
  entityName: 'OtherThing',
  entityNamePlural: 'OtherThings',
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