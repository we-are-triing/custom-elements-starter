const Home = require('../templates/home.js');
const Article = require('../templates/article.js');
const fetch = require('node-fetch');

module.exports = (app) => {
    app.get('/', (req, res) => {
        fetch(`http://localhost:8080/api/home/`)
        .then( response => response.json() )
        .then( json => {
            let home = new Home(json);
            res.send(home.render());
        });

    });

    app.get('/article/:id', (req,res) => {
        const {id} = req.params;
        fetch(`http://localhost:8080/api/article/${id}`)
        .then( response => response.json() )
        .then( json => {
            const article = new Article(json);
            res.send(article.render());
        });
    });
};
