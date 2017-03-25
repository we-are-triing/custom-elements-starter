class SiteLogo extends RootComponent {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootComponent.registerElement('site-logo', SiteLogo);
