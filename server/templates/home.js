const BaseTemplate = require('./base.js');
class Home extends BaseTemplate {
    constructor(data){
        super();
        this.createParts(data);
    }
    createParts({navigation, content, footerNavigation, title, description, socialImage}){
        this.head.title = title;
        this.head.content = `
            <meta property="og:title" content="${title}">
            <meta property="og:description" content="${description}">
            <meta property="og:image" content="${socialImage}">
        `;
        this.header = this.populateHeader({navigation});
        this.page = this.populatePage(content);
        this.footer = this.populateFooter({navigation});
    }
    populatePage(content){
        return content.map( block => {
            switch (block.type) {
                case "title":
                    return `<main-block heading="${block.title}" lede="${block.lede}" img="${block.img}" ></main-block>`;
                case "content":
                    return `<content-block>${block.content}</content-block>`;
                case "tile":
                    return ``;
                case "tile-list":
                    return ``;
                default:
                    return ``;

            }
        }).join('');
    }
}
module.exports = Home;
