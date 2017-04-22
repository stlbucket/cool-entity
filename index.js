const coolEntity = require('./src');

module.exports = {
  CoolClient: coolEntity.CoolClient,
  CoolEntity: require('./src/coolEntity'),
  CoolRelation: require('./src/coolRelation'),
  CoolCollection: require('./src/coolCollection')
};