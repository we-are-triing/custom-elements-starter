import content from '../data/content.mjs';
import header from '../data/header.mjs';

const getData = ({ id, template }) => {

    let item = template === "article" ? content.articles[id] : content.home;

    return {
        navigation: header.navigation,
        content: item.content,
        title: item.meta.title,
        description: item.meta.description,
        socialImage: item.meta.image
    }

};


export default (app) => {
    app.get('/api/article/:id', (req, res) => {
        const id = req.params.id === '1' ? 1 : 0;
        res.send(getData({
            id,
            template: 'article'
        }));
    });
    app.get('/api/home/', (req, res) => {
        res.send(getData({id: 0, template: 'home'}));
    });
};
