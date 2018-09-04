const normalizePort = require('./port');

const config = {
  development: {
    port: normalizePort(),
  },

  test: {
    port: normalizePort(),
  },
};

const env = process.env.NODE_ENV;

module.exports = config[env];
