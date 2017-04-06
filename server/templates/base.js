class BaseTemplate {
    constructor(){
        this.head = {};
    }
    render(){
        const body = `
            ${this.header}
            <main>
                <a-shadowed-element>
                    <p>I'm in a slot</p>
                    <a-non-shadowed-element></a-non-shadowed-element>
                </a-shadowed-element>
                ${this.page}
            </main>
            ${this.footer}
        `;
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">

                <meta property="og:site_name" content="Native Elements Starter">
                <title>${this.head.title}</title>
                ${this.head.content}
                <link rel="stylesheet" href="/index.css" />
                <script src="/polyfills/webcomponents-loader.js"></script>
                <link rel="import" href="/shadower/shadower.html" />
                ${
                    this.parseElements(body).map( (name) => {
                        return `<link rel="import" href="/elements/${name}/${name}.html">`;
                    }).join('')
                }
            </head>
            <body>
                ${body}
            </body>
        </html>
        `;
    }
    populateHeader({userData, navigation}){
        return `
            <site-header>
                <site-logo lang="${userData.language}"></site-logo>
                <site-nav lang="${userData.language}">
                    ${
                        navigation.map(({href, text}) => {
                            return `<nav-item href="${href}">${text}</nav-item>`;
                        }).join('')
                    }
                </site-nav>
                <site-search></site-search>
                <user-area>${userData.name}</user-area>
            </site-header>
        `;
    }
    populateFooter({userData, navigation}){
        return `
            <site-footer>
                <footer-nav lang="${userData.lang}">
                    ${
                        navigation.map(({href, text}) => {
                            return `<nav-item href="${href}">${text}</nav-item>`;
                        }).join('')
                    }
                </footer-nav>
            </site-footer>
        `;
    }
    parseElements(str){
        const reg = /(?:<|is=")\w+?-[\w-]+(?:\s*?|>)/gi;
        return [...new Set(str.match(reg).map( (s) => s.replace(/^(<|is=")/gi,'') ))]
    }
}
module.exports = BaseTemplate;
