class SiteHeader extends RootComponent {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootComponent.registerElement('site-header', SiteHeader);
