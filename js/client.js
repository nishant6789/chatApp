// import { io } from "socket.io-client";
const socket = io("ws://localhost:8000");
// send a message to the server

//const socket = new WebSocket("ws://localhost:8000");
// const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})