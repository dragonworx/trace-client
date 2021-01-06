const io = require('socket.io-client');

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;
const FLUSH_INTERVAL = 250;
const RECONNECTION_DELAY = 350;

// todo...remove only for alpha
const log = (color, ...args) => console.log(`%c${args}`, `color:${color}`);

class SocketClient {
  constructor(options) {
    this.socket = undefined;
    this.isConnected = false;
    this.buffer = [];

    if (options.enabled) {
      this.initSocket();
    }
  }

  initSocket() {
    const socket = io(`ws://${SERVER_HOST}:${SERVER_PORT}`, {
      reconnectionDelay: RECONNECTION_DELAY,
    });
    this.socket = socket;

    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDissConnect.bind(this));
    socket.on('data', this.onData);

    setInterval(() => {
      log('white', 'buffer: ' + this.buffer.length);

      if (this.isConnected && this.buffer.length) {
        this.flush();
      }
    }, FLUSH_INTERVAL);
  }

  onConnect() {
    log('green', 'connect! ' + this.socket.id);

    this.isConnected = true;
    this.socket.emit('message', {
      id: this.socket.id,
      sentAt: Date.now(),
      type: 'connect',
    });

    document.body.style.backgroundColor = 'green';
  }

  onDissConnect() {
    log('red', 'dissconnect! ' + this.socket.id);

    this.isConnected = false;
    this.socket.emit('message', {
      id: this.socket.id,
      sentAt: Date.now(),
      type: 'dissconnect',
      data: this.socket.id,
    });

    document.body.style.backgroundColor = 'red';
  }

  onData(data) {
    log('yellow', 'data! ' + JSON.stringify(data));
  }

  push(namespace, args) {
    const message = {
      namespace,
      args,
    };
    log('orange', 'push! ' + JSON.stringify(message));
    this.buffer.push(message);
  }

  flush() {
    log('pink', 'flush! ' + this.buffer.length);

    const message = {
      id: this.socket.id,
      sentAt: Date.now(),
      type: 'flush',
      data: this.buffer,
    };

    this.socket.emit('message', message);
    this.buffer.length = 0;
  }
}

module.exports = SocketClient;
