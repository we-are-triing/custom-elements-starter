class UserArea extends RootElement {
    constructor() {
        super();

        this.buildShadowRoot();
    }
}

RootElement.registerElement('user-area', UserArea);
