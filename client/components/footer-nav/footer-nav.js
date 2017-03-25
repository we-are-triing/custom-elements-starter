class FooterNav extends RootComponent {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootComponent.registerElement('footer-nav', FooterNav);
