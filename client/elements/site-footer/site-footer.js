class SiteFooter extends RootElement {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootElement.registerElement('site-footer', SiteFooter);
