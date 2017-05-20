class TitleBlock extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
        this.elems = {
            container: this.shadowRoot.querySelector('section'),
            title: this.shadowRoot.querySelector('h1'),
            lede: this.shadowRoot.querySelector('p.lede')
        }
    }

    static get observedAttributes() {
        return [`title`,`lede`];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case `title`:
                this.elems.title.innerText = newVal;
                break;
            case `lede`:
                this.elems.lede.innerText = newVal;
                break;
            default:
                break;
        }
    }

    get title(){
        return this.getAttribute('title');
    }
    set title(val){
        if(val){
            this.setAttribute('title', val);
        }
        else {
            this.removeAttribute('title');
        }
    }
    get lede(){
        return this.getAttribute('lede');
    }
    set lede(val){
        if(val){
            this.setAttribute('lede', val);
        }
        else {
            this.removeAttribute('lede');
        }
    }
}
RootElement.registerElement('title-block', TitleBlock);
