var socket = io();

socket.on('connect', function() {
    console.log('Connected to the server');
    
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});



socket.on('newMessage', function(message){
    //console.log('new Message', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#myList').append(li);
});



$('#myForm').on('submit', function(e){

    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name="message"]').val()
    }, function(){
        console.log('Message Sent');
    });

});