import { io } from 'socket.io-client';

const socket_url: string = window.location.origin === 'http://localhost:8080' || window.location.origin === 'http://localhost'
  ? 'http://localhost:5000'
  : window.location.origin;
export const socket = io(socket_url);

