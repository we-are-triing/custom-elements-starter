class SiteNav extends RootElement {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootElement.registerElement('site-nav', SiteNav);
