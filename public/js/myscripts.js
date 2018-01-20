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
    li.text(`${message.from} (${message.createdAt}): ${message.text}`);

    $('#myList').append(li);
});


socket.on('newLocationMessage', function(message){
    //console.log('new Message', message);

    var li = $('<li></li>');
    li.text(`${message.from} (${message.createdAt}): `);
    var a = $('<a target="_blank">My Location</a>');
    a.attr('href', message.url);
    li.append(a);

    // li.text(`${message.from}: ${message.text}`);

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


var geolocation = $('#geoLocation');

geolocation.on('click', function(e){
    
    if(!navigator.geolocation){
        return alert('Geolocation not supported by Your Browser');
    }

    navigator.geolocation.getCurrentPosition( function(position){

        socket.emit('createLocation', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch Location');
    });

});