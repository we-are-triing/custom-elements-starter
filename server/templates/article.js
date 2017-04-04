const BaseTemplate = require('./base.js');
class Article extends BaseTemplate {
    constructor(data){
        super(data);
        this.createParts(data);
    }
    createParts(data){
        this.head.title = `Sample Article Page`;
        this.head.content = `
            <meta property="og:title" content="${data.social.title}">
            <meta property="og:description" content="${data.social.description}">
            <meta property="og:image" content="${data.social.image}">
        `;
        this.header = this.populateHeader({userData: data.userData, navigation: data.header.navigation});
        this.page = this.populatePage(data.content);
        this.footer = this.populateFooter({userData: data.userData, navigation: data.footer.navigation});
    }
    populatePage(content){
        return content.map( block => {
            switch (block.type) {
                case "content":
                    return `
                        <content-block>${block.content}</content-block>
                    `;
                case "media":
                    return `
                        <media-block title="${block.title}" caption="${block.caption}" img="${block.img}"></media-block>
                    `;
                default:
                    return ``;

            }
        }).join('');
    }
}
module.exports = Article;
