const SocketClient = require('./socketClient');

const options = {
  enabled: true,
};

class Emitter {
  constructor() {
    this.listeners = [];
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  emit(type, data) {
    this.listeners.forEach(fn => fn(type, data));
  }
}

const emitter = new Emitter();
const socketClient = new SocketClient(emitter, options);

function trace(namespace, ...args) {
  if (options.enabled) {
    socketClient.push('trace', { namespace, args });
  }
}

trace.on = (eventType, listener) => {
  emitter.addListener((type, data) => {
    if (type === eventType) {
      listener(data);
    }
  });
  return trace;
};

module.exports = trace;
