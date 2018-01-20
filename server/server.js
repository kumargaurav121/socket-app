const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const moment = require('moment');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var date = moment();


generateMessage = (from, text) => {
    return {from, text, createdAt: date.format('h:mm a')};
}

generateLocationMessage = (from, lat, lng) => {
    return {from, url: `https://www.google.com/maps?q=${lat},${lng}`, createdAt: new Date().getTime()};
}


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('connected to a new user');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chatroom'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));


    socket.on('createLocation', (position) => {
        console.log(position);
        io.emit('newLocationMessage', generateLocationMessage('Admin', position.lat, position.lng));
    });

    


    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        callback('I got YOu babe');
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('Dicsonnected from the user');
    });
});





server.listen(port, () => {
    console.log(`App is starting on the port ${port}`);
})