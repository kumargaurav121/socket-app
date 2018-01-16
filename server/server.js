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

    socket.on('disconnect', () => {
        console.log('Dicsonnected from the user');
    });
});





server.listen(port, () => {
    console.log(`App is starting on the port ${port}`);
})