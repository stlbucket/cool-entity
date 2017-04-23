const coolClient = require('../coolClient');

clog = require('fbkt-clog');

class ClientWrapper{
  constructor(options){
    this.options = options || {};
  }

  query(query, options){
    const useOptions = options || {verbose: false};

    if (
      (useOptions.verbose === true ||
      this.options.verbose === true && useOptions.verbose !== false)
    ) {
      clog('EXECUTING GRAPH COOL QUERY', query);
      clog('VARIABLES', options.variables);
    }
    return coolClient.query(query, useOptions.variables);
  }

  mutate(mutation, options) {
    const useOptions = options || {verbose: false};

    if (
      (options || useOptions.verbose === true ||
      this.options.verbose === true && useOptions.verbose !== false)
    ) {
      clog('EXECUTING GRAPH COOL MUTATION', mutation);
    }
    return coolClient.mutate(mutation, useOptions.variables);
  }
}

module.exports = ClientWrapper;