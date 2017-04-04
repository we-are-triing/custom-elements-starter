class SiteLogo extends RootElement {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootElement.registerElement('site-logo', SiteLogo);
