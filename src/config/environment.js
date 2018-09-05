const normalizePort = require('./port');

const config = {
  development: {
    port: normalizePort(),
    mongoURL: 'mongodb://localhost:27017/bon-appetit',
  },

  test: {
    port: normalizePort(),
    mongoURL: 'mongodb://localhost:27017/bon-appetit',
  },
};

const env = process.env.NODE_ENV;

module.exports = config[env];
