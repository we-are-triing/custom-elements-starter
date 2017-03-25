class SiteFooter extends RootComponent {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootComponent.registerElement('site-footer', SiteFooter);
