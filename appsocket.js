/* ************************************************************************ */
/*
    Socket IO Stuff - This is where we'll wait for socket.io events. Any 
    other module that has access to server.js:app can also wait for events.

    This follows a pattern similar to the router, where the 'app' and 'db'
    objects are passed into the module.
*/
exports = module.exports = function (app) {

    /*
        Configuration
    */
    var config = app.get('appconf');

    /*
        Socket Name Space if configured.... 
    */
    var sio;

    if((config.use_socknsp === true) && (config.socknsp.length > 2)) {
        console.log('SOCKET.IO - using namespace - '+config.socknsp);
        sio = app.get('socketio').of(config.socknsp);
    } else {
        console.log('SOCKET.IO - NOT using namespace');
        sio = app.get('socketio');
    }

    /*
        Set socket.io listeners and wait for a connection
    */
    sio.on('connection', function(socket) {

        console.log('SOCKET.IO - client connected - id = '+socket.id+' addr = '+socket.conn.remoteAddress);

        /*
            Saved for use later, if not necessary then delete
        */
        var socketID = socket.id;
        var remoteAddr = socket.conn.remoteAddress;

        /*
            Might want to know when this particular client has
            disconnected.
        */
        socket.on('disconnect', function() {
            console.log('SOCKET.IO - client disconnected = '+socketID+' addr = '+remoteAddr);
        });

        /* **************************************************************** */
        /*
            When the client calls socket.emit('something', data) we'll 
            receive it here.
        */
        socket.on('something', function(data, reply) {
            console.log('SOCKET.IO - something - client  = '+socketID+' addr = '+remoteAddr);
            console.log('SOCKET.IO - something - data  = '+JSON.stringify(data));
            console.log('SOCKET.IO - something - replying with data');
            reply(data);
        };
    };
};

