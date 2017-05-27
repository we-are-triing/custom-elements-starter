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
        return [`heading`,`lede`];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case `heading`:
                this.elems.title.innerText = newVal;
                break;
            case `lede`:
                this.elems.lede.innerText = newVal;
                break;
            default:
                break;
        }
    }

    get heading(){
        return this.getAttribute('heading');
    }
    set heading(val){
        if(val){
            this.setAttribute('heading', val);
        }
        else {
            this.removeAttribute('heading');
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
