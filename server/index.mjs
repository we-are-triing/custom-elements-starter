import Hapi from 'hapi';
import api from './api/api.mjs';
import routes from './routes/routes.mjs';
import chokidar from 'chokidar';
import socketio from 'socket.io';
import Inert from 'inert';
// import http2 from 'http2';
// import {readFileSync} from 'fs';

// const options = {
//     key: readFileSync('server.key'),
//     cert: readFileSync('server.crt')
// }

const server = Hapi.server({
    // listener: http2.createServer(options),
    port: process.env.PORT || 8000,
    host: 'localhost'
});


const init = async () => {    
    await server.register(Inert);
    api(server);
    routes(server);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

if(process.env.NODE_ENV === "dev"){
    const io = socketio(server);
    var watcher = chokidar.watch(['client/**/*.*'], {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });

    let sockets = [];
    io.on('connection', function (socket) {
        if(!sockets.find(s => s === socket)){
            sockets.push(socket);
        }
    });

    watcher.on('change', path => {
        console.info(`client reload from change: ${path}`);
        sockets.forEach((socket) => {
            socket.emit('reload');
        });
    });

    process.once('SIGUSR2', () => {
        sockets.forEach((socket) => {
            socket.emit('delayed-reload');
        });
        process.kill(process.pid, 'SIGUSR2');
    });
}

init();