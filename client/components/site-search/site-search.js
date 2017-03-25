class SiteSearch extends RootComponent {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootComponent.registerElement('site-search', SiteSearch);
