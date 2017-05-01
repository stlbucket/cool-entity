const R = require('ramda');
const clog = require('fbkt-clog');
const Promise = require('bluebird');

function validateRequiredFields(fields, entity) {
  return Promise.reduce(
    R.keys(fields),

    (acc, fieldName) => {
      if ((entity[fieldName] === undefined || entity[fieldName] === null) && fields[fieldName].required === true) {
        const error = `ENTITY ${JSON.stringify(entity)}`;
        return R.merge(acc, {
          [fieldName]: error
        })
      } else {
        return acc;
      }
    },
    {}
  )
}


module.exports = validateRequiredFields