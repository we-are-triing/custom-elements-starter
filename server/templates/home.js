import BaseTemplate from './base.js';

export default class Home extends BaseTemplate {
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
                case "tabs":

                    return `<tabbed-content>
                                ${block.content.reduce( (a,n,i) => {
                                    if(i === 0){ this.stiva = {active: {active: n.tab} };}
                                    return `${a}<tab-panel tabtitle="${n.tab}">${n.content}</tab-panel>`
                                }, '')}
                            </tabbed-content>
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
