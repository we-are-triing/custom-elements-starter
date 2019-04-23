import content from '../data/content.js';
import header from '../data/header.js';

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


export default server => {

    server.route({
        method: `GET`,
        path:`/api/article/{id}`,
        handler: (req,h) => {
            const id = req.params.id === '1' ? 1 : 0;
            return getData({id,template: 'article'});    
        }
    });

    server.route({
        method: `GET`,
        path:`/api/home`,
        handler: (req,h) => getData({id: 0, template: 'home'})
    });

};
