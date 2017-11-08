import express from 'express';
import http from 'http';
import compression from 'compression';
import url from 'url';
import path from 'path';
import api from './api/api.mjs';
import routes from './routes/routes.mjs';
import chokidar from 'chokidar';
import socketio from 'socket.io';
import ES from 'element-storybook';

const Storybook = ES.Storybook;

const app = express();
const server = http.Server(app);

const cwd = process.cwd();

const polyfillsURL = path.join(cwd, `node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js`); //require.resolve('@webcomponents/webcomponentsjs');
const stivaURL = path.join(cwd,`node_modules/stiva/stiva.js`); //require.resolve('stiva');

app.use(compression());
app.use('/static', express.static('client'));
app.use('/static/polyfills/', express.static( path.join(polyfillsURL, '../') ));
app.use('/stiva.js', express.static( stivaURL ));

const storybook = new Storybook({
    stories: `client/elements/**/*.story.js`,
    storybookRoot: '/element-storybook/',
    pathToElements: '/static/elements/',
    pathToPolyfills: '/static/polyfills/',
    moduleType: 'js',
    app,
    dir: cwd,
    stylesheet: `/static/index.css`,
    inject: process.env.NODE_ENV === "dev" ? `   <script src="/static/lib/socket.io.js"></script>
                <script>
                    let socket = io('/');
                    socket.on('reload', () => document.querySelector('element-display').reload());
                    socket.on('delayed-reload', () => setTimeout(() => location.reload(), 1000 ));
                </script>
            ` : ``
});

api(app);
routes(app);

if(process.env.NODE_ENV === "dev"){
    const io = socketio(server);
    var watcher = chokidar.watch(['client/**/!(*.story).*'], {
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

server.listen(process.env.PORT || 8000, () => {
	console.info(`Native Elements Starter App listening on port ${process.env.PORT || 8000}`);
});

// Do not use this to keep the server alive, only to exit the process gracefully. Node domains solve
// this more elegantly, but they're unbaked and funky when working with the generic-pool module.
// See: http://nodejs.org/api/process.html#process_event_uncaughtexception
process.on('uncaughtException', function(err) {
	console.error(err, 'Unhandled exception. App will stop taking new requests, and exit within 15 seconds.');
	setTimeout(function () {
		process.exit(1);
	}, 15000);
	server.close(); // prevent new connections
});
