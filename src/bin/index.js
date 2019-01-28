const cluster = require("cluster");
const { cpus } = require("os");

const environment = require("../config/environment");
const serverListeners = require("./server-listeners");
const app = require("../app");

const numCPUs = cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const { onListening, onError } = serverListeners;
  const { port } = environment;
  const server = app.listen(port);

  server.on("listening", () => onListening(server));

  server.on("error", err => onError(err, port));
}
