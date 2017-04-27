const express = require('express');
const path = require('path');
const app = express();
const Article = require('./templates/article.js');
const fetch = require('node-fetch');
const fakeAPI = require('./api/api.js');
const { Storybook } = require('element-storybook');

app.use('/', express.static('client'));

app.get('/article/:id', (req,res) => {
    const {id} = req.params;
    //This is a hack, do this better.
    if(id !== "0" && id !== "1"){
        res.send('');
    }
    else {
        fetch(`http://localhost:8080/api/article/${id}`)
        .then( response => response.json() )
        .then( json => {
            const article = new Article(json);
            res.send(article.render());
        });
    }
});

//fake API path: there are only 0,1 as an id in this example
app.get('/api/:template/:id', (req, res) => {
    const {id, template} = req.params;
    // this is also where you can parse the request headers and determine language.
    res.send(fakeAPI({id, template}));
});

const server = app.listen(process.env.PORT || 8080, () => {
    console.info(`Native Web App listening on port ${process.env.PORT || 8080}`);
});

const storybook = new Storybook({
    stories: `client/elements/**/*.story.js`,
    routeRoot: '/element-storybook/',
    pathToElements: '/elements/',
    app,
    dir: path.join(__dirname,`../`)
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
