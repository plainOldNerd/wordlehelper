const http = require('http');
const fs = require('fs');

const portToListen = 80;

// https://gajus.medium.com/how-to-terminate-a-http-server-in-node-js-d374f8b8c17f
const sockets = new Set();
const disconnectSockets = function() {
    for( const socket of sockets ) {
        socket.destroy();
        sockets.delete( socket );
    }
};

const server = http.createServer(function (req, res) {
    let path = req.url;
    switch( path ) {
        case '/': {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('./basicPage.html', function (error, data) {
                res.end(data);
            });
            break;
        }
        case '/closeServer': {
            disconnectSockets();
            server.close();
        }
        default: {
            path = '.' + path;
            res.writeHead(200);
            fs.readFile(path, function (error, data) {
                res.end(data);
            });
        }
    }
});

// https://gajus.medium.com/how-to-terminate-a-http-server-in-node-js-d374f8b8c17f
server.on('connection', socket => {
    sockets.add( socket );
    server.once('close', () => {
        sockets.delete( socket );
    });
});

server.listen(portToListen);
