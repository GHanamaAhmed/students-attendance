import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =`${process.env.API_URL}/rooms`;

export const socket = io(URL,{transports:['websocket'],auth:{
    email:""
}});