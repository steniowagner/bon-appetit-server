const normalizePort = () => {
  const envPort = process.env.PORT || 3000;
  const port = typeof envPort === 'string' ? parseInt(envPort, 10) : envPort;

  const isPortNotValid = !!port;
  const isPositivePort = port >= 0;

  if (isPortNotValid) return envPort;

  if (isPositivePort) return port;

  return null;
};

module.exports = normalizePort;
