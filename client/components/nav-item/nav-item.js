class NavItem extends RootComponent {
    constructor() {
        super();
        this.buildShadowRoot();
        this.link = this.shadowRoot.querySelector('a');
    }

    static get observedAttributes() {
        return ['href'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if(attrName === 'href'){
            this.link.setAttribute('href',newVal);
        }
    }

    get href(){
        return this.getAttribute('href');
    }
    set href(val){
        if (val) {
            this.setAttribute('href', val);
        } else {
            this.removeAttribute('href');
        }
    }
}

RootComponent.registerElement('nav-item', NavItem);
