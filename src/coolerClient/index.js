const Promise = require('bluebird');
const clog = require('fbkt-clog');
const {Lokka}     = require('lokka')
const {Transport} = require('lokka-transport-http')
let _client;

const _graphqlEndpoint = process.env.GRAPHQL_ENDPOINT

if (_graphqlEndpoint === null || _graphqlEndpoint === undefined || _graphqlEndpoint === '') {
  throw new Error('GRAPHQL_ENDPOINT process variable must be defined');
}

const _coolEmail = process.env.COOL_EMAIL;
const _coolPassword = process.env.COOL_PASSWORD;

const signinUserMutation = `($email: String!, $password: String!) {
  authenticatedUser: signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
  }
}
`

function initClient() {
  const _initClient = new Lokka({
    transport: new Transport(_graphqlEndpoint)
  });

  if (_client) {
    return Promise.resolve(_client)
  } else if (_coolEmail) {
    return _initClient.mutate(signinUserMutation,
      {
        email: _coolEmail,
        password: _coolPassword
      }
    )
      .then(result => {
        // clog('SIGNIN RESULT', result);

        const token = result.authenticatedUser.token;

        const headers = {
          'authorization': `Bearer ${token}`
        };

        // clog('HEADERS', headers);

        _client = new Lokka({
          transport: new Transport(_graphqlEndpoint, {headers})
        });

        return _client;
      })
      .catch(error => {
        clog.error('UNABLE TO AUTH COOL CLIENT', error);
        throw error;
      })

  } else {
    clog("NO AUTH - THAT'S NOT REALLY COOL");
    _client = _initClient;
    return Promise.resolve(_client)
  }
}


module.exports = initClient;