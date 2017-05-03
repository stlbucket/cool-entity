const Promise = require('bluebird');
const clog = require('fbkt-clog');
const {Lokka}     = require('lokka')
const {Transport} = require('lokka-transport-http')
let _client;
let _clientInitializer;

const _graphqlEndpoint = process.env.GRAPHQL_ENDPOINT

if (_graphqlEndpoint === null || _graphqlEndpoint === undefined || _graphqlEndpoint === '') {
  throw new Error('GRAPHQL_ENDPOINT process variable must be defined');
}

const _coolAuth = process.env.COOL_AUTH;
const _coolEmail = process.env.COOL_EMAIL;
const _coolPassword = process.env.COOL_PASSWORD;

if (_coolAuth && (!_coolEmail || !_coolPassword)) {
  throw new Error('COOL AUTH ENABLED WITH NO EMAIL OR PASSWORD');
}

const signinUserMutation = `($email: String!, $password: String!) {
  authenticatedUser: signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
  }
}
`

function initAuthClient() {
  if (_clientInitializer) {
    return Promise.resolve(_clientInitializer);
  } else {
    const _initClient = new Lokka({
      transport: new Transport(_graphqlEndpoint)
    });

    _clientInitializer = _initClient.mutate(signinUserMutation,
      {
        email: _coolEmail,
        password: _coolPassword
      }
    )
      .then(result => {
        // console.trace('wha');
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

    return Promise.resolve(_clientInitializer);
  }
}

function initNoAuthClient() {
  _client = new Lokka({
    transport: new Transport(_graphqlEndpoint)
  });

  return Promise.resolve(_client);
}

function getClient() {

  if (_client) {
    return Promise.resolve(_client)
  } else if (_coolAuth) {
    return initAuthClient();
  } else {
    clog("NO AUTH - THAT'S NOT REALLY COOL");
    return initNoAuthClient();
  }
}


module.exports = getClient;