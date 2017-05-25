class MainBlock extends RootElement {
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
        return [`heading`,`lede`,`src`];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case `heading`:
                this.elems.title.innerText = newVal;
                break;
            case `lede`:
                this.elems.lede.innerText = newVal;
                break;
            case `src`:
                this.style.setProperty(`--img`, newVal);
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
    get src(){
        return this.getAttribute('src');
    }
    set src(val){
        if(val){
            this.setAttribute('src', val);
        }
        else {
            this.removeAttribute('src');
        }
    }

}
RootElement.registerElement('main-block', MainBlock);
