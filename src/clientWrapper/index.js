const coolClient = require('../coolClient');

clog = require('fbkt-clog');

class ClientWrapper {
  constructor(options) {
    this.options = options || {};
  }

  query(query, options) {
    const useOptions = options || {verbose: false};

    if (
      (useOptions.verbose === true ||
      this.options.verbose === true && useOptions.verbose !== false)
    ) {
      clog('EXECUTING GRAPH COOL QUERY', query);
      clog('VARIABLES', options.variables);
    }
    return coolClient.query(query, useOptions.variables)
      .then(result => {
        if (useOptions.resultKey) {
          return result[useOptions.resultKey];
        } else {
          return result;
        }
      });
  }

  mutate(mutation, options) {
    const useOptions = options || {verbose: false};

    if (
      (options || useOptions.verbose === true ||
      this.options.verbose === true && useOptions.verbose !== false)
    ) {
      clog('EXECUTING GRAPH COOL MUTATION', mutation);
    }
    return coolClient.mutate(mutation, useOptions.variables)
      .then(result => {
        if (useOptions.resultKey) {
          return result[useOptions.resultKey];
        } else {
          return result;
        }
      });
  }
}

module.exports = ClientWrapper;