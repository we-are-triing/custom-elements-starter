class BaseTemplate {
    constructor(){}
    render(){
        const body = `
            ${this.header}
            <main>
                ${this.page}
            </main>
            ${this.footer}
        `;
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Native Web Test</title>
                <meta charset="utf-8" />
                <link rel="stylesheet" href="/index.css" />
                <script src="/polyfills/webcomponents-loader.js"></script>
                ${
                    this.arrayToString( this.parseElements(body).map( (name) => {
                        return `<link rel="import" href="/components/${name}/${name}.html">`;
                    }))
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
                        this.arrayToString(navigation.map(({href, text}) => {
                            return `<nav-item href="${href}">${text}</nav-item>`;
                        }))
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
                        this.arrayToString(navigation.map(({href, text}) => {
                            return `<nav-item href="${href}">${text}</nav-item>`;
                        }))
                    }
                </footer-nav>
            </site-footer>
        `;
    }

    arrayToString(arr){
        let str = ``;
        arr.forEach( (item) => {
            str += item;
        })
        return str;
    }
    parseElements(str){
        const reg = /(?:<|is=")\w+?-[\w-]+(?:\s*?|>)/gi;
        return [...new Set(str.match(reg).map( (s) => s.replace(/^(<|is=")/gi,'') ))]
    }
}
module.exports = BaseTemplate;
