const SocketClient = require('./socketClient');

const options = {
  enabled: true,
};

const socketClient = new SocketClient(options);

const trace = (namespace, ...args) => {
  if (options.enabled) {
    socketClient.push(namespace, args);
  }
};

module.exports = trace;
