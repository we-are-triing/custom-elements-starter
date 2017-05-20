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
        return [`title`,`lede`,`src`];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case `title`:
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
