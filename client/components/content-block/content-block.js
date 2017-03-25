class ContentBlock extends RootComponent {
    constructor() {
        super();
        this.buildShadowRoot();
    }
}
RootComponent.registerElement('content-block', ContentBlock);
