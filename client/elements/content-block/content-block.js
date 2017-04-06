class ContentBlock extends HTMLElement {
    constructor() {
        super();
        Shadower.attach(this);
    }
}
customElements.define('content-block', ContentBlock);
