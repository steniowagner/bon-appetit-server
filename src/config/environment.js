const config = {
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT
  }
};

module.exports = config[process.env.NODE_ENV];
