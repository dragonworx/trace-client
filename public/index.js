/* eslint-disable no-undef */
const namespaceEl = document.querySelector('#namespace input');
const argsEl = document.querySelector('#args input');
const connectedIcon = document.getElementById('connection-state');
const socketId = document.getElementById('id');

document.getElementById('submit').addEventListener('click', () => {
  const namespace = namespaceEl.value;
  const args = argsEl.value;
  trace(namespace, JSON.parse(args));
});

trace
  .on('connect', id => {
    connectedIcon.src = 'public/img/connected.png';
    socketId.innerHTML = id;
  })
  .on('dissconnect', () => {
    connectedIcon.src = 'public/img/dissconnected.png';
    socketId.innerHTML = '';
  });
