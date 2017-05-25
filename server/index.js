const express = require('express');
const app = express();
const server = require('http').Server(app);
const compression = require('compression');
const path = require('path');

const { Storybook } = require('element-storybook');

app.use(compression());
app.use('/static', express.static('client'));

const storybook = new Storybook({
    stories: `client/elements/**/*.story.js`,
    storybookRoot: '/element-storybook/',
    pathToElements: '/static/elements/',
    pathToPolyfills: '/static/polyfills/',
    app,
    dir: path.join(__dirname,`../`),
    stylesheet: `/static/index.css`,
    inject: process.env.NODE_ENV === "dev" ? `   <script src="/static/lib/socket.io.js"></script>
                <script>
                    let socket = io('/');
                    socket.on('reload', () => document.querySelector('element-display').reload());
                    socket.on('delayed-reload', () => setTimeout(() => location.reload(), 1000 ));
                </script>
            ` : ``
});

require('./api/api.js')(app);
require('./routes/routes.js')(app);

if(process.env.NODE_ENV === "dev"){
    const chokidar = require('chokidar');
    const io = require('socket.io')(server);
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

server.listen(process.env.PORT || 8080, () => {
	console.info(`Native Elements Starter App listening on port ${process.env.PORT || 8080}`);
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
