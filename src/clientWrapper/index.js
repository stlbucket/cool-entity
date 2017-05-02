const Promise = require('bluebird');
const coolClient = require('../coolerClient');

clog = require('fbkt-clog');

class ClientWrapper {
  constructor(options) {
    this.options = options || {};
  }

  initClient(){
    if (this.coolClient) {
      return Promise.resolve(this.coolClient);
    } else {
      return coolClient()
        .then(client => {
          this.coolClient = client;
          return this.coolClient
        });
    }

  }

  query(query, options) {
    const useOptions = options || {verbose: false};

    if (
      (useOptions.verbose === true ||
      (this.options.verbose === true && useOptions.verbose !== false))
    ) {
      clog('EXECUTING GRAPH COOL QUERY', query);
      clog('QUERY OPTIONS', useOptions);
    }

    return this.initClient()
      .then(coolClient => {
        return coolClient.query(query, useOptions.variables)
          .then(result => {
            if (useOptions.resultKey) {
              return result[useOptions.resultKey];
            } else {
              return result;
            }
          });
      })
  }

  mutate(mutation, options) {
    const useOptions = options || {verbose: false};

    if (
      (useOptions.verbose === true ||
      (this.options.verbose === true && useOptions.verbose !== false))
    ) {
      clog('EXECUTING GRAPH COOL MUTATION', mutation);
      clog('MUTATION OPTIONS', useOptions);
    }

    return this.initClient()
      .then(coolClient => {
        return coolClient.mutate(mutation, useOptions.variables)
          .then(result => {
            if (useOptions.resultKey) {
              return result[useOptions.resultKey];
            } else {
              return result;
            }
          });
      })
  }
}

module.exports = ClientWrapper;