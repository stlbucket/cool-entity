const ClientWrapper = require('./clientWrapper');

const client = new ClientWrapper();

module.exports = {
  CoolClient: client,
  CoolEntity: require('./coolEntity'),
  CoolRelation: require('./coolRelation'),
  CoolCollection: require('./coolCollection')
};