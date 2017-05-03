'use strict';
const clog = require('fbkt-clog');
const Promise = require('bluebird');
const expect = require('chai').expect;

const coolClient = require('../../index').CoolClient;

describe.only('cooler client', function () {
  this.timeout(4000);

  const allUsersQuery = `
    {
      allUsers {
        email
      }
    }
  `;

  it('init client', function (done) {
      Promise.props({
        one: coolClient.query(allUsersQuery),
        two: coolClient.query(allUsersQuery)
      })
      .then(result => {
        clog('FINAL RESULT', result);
        done();
      })
      .catch(error => {
        done(error);
      })
  });

});
