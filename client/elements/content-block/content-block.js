class ContentBlock extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
    }
}
RootElement.registerElement('content-block', ContentBlock);
