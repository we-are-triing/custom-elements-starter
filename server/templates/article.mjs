import BaseTemplate from './base.mjs';

export default class Article extends BaseTemplate {
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
                    return `
                        <title-block heading="${block.title}" lede="${block.lede}"></title-block>
                    `;
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
