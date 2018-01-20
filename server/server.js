const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('connected to a new user');

    socket.emit('newMessage', {
        from: 'Admin',
        text: `Welcome to the ChatRoom`,
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from : 'Admin',
        text: `New User joined`,
        createdAt: new Date().getTime()
    });


    socket.on('createLocation', (position) => {
        console.log(position);
        io.emit('newLocationMessage', generateLocationMessage('Admin', position.lat, position.lng));
    });

    generateMessage = (from, text) => {
        return {from, text};
    }

    generateLocationMessage = (from, lat, lng) => {
        return {from, url: `https://www.google.com/maps?q=${lat},${lng}`};
    }


    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        callback('I got YOu babe');
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('Dicsonnected from the user');
    });
});





server.listen(port, () => {
    console.log(`App is starting on the port ${port}`);
})