'use strict';
const clog = require('fbkt-clog');
const expect = require('chai').expect;

const target = require('../../src/coolerClient/index');

describe.skip('cooler client', function () {
  this.timeout(4000);

  const allUsersQuery = `
    {
      allUsers {
        email
      }
    }
  `;

  it('init client', function (done) {
    target()
      .then(client => {
        clog('CLIENT', client);
        return client.query(allUsersQuery);
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
