class SiteHeader extends RootElement {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootElement.registerElement('site-header', SiteHeader);
