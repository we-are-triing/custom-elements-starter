class BaseTemplate {
    constructor(){
        this.head = {};
        this.elementList = [];
    }
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
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">

                <meta property="og:site_name" content="Placeholder Service">
                <title>${this.head.title}</title>
                ${this.head.content}
                <link rel="stylesheet" href="/static/index.css" />
                <script src="/static/polyfills/webcomponents-loader.js"></script>
                ${
                    this.parseElements(body).map( (name) => {
                        return `<link rel="import" href="/static/elements/${name}/${name}.html">`;
                    }).join('')
                }
            </head>
            <body>
                ${body}
                <script src="/static/lib/socket.io.js"></script>
                <script>
                    let socket = io('/');
                    socket.on('reload', () => location.reload());
                    socket.on('delayed-reload', () => setTimeout(() => location.reload(), 1000 ));
                </script>
            </body>
        </html>
        `;
    }
    populateHeader({navigation}){
        return `
            <site-header>
                <site-logo></site-logo>
                <site-nav>
                    ${
                        navigation.map(({href, text}) => {
                            return `<nav-item href="${href}">${text}</nav-item>`;
                        }).join('')
                    }
                </site-nav>
            </site-header>
        `;
    }
    populateFooter({navigation}){
        return `
            <site-footer>
                <footer-nav>
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
