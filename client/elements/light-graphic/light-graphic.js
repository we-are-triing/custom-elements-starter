class LightGraphic extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
        this.elems = {
            svg: this.shadowRoot.querySelector('svg')
        };
        this.positionToDeg = {
            start: 270,
            top: 0,
            end: 90,
            bottom: 180
        }
    }

    static get observedAttributes() {
        return [`color`,`inverse`,`position`,`lead`];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case `color`:
                this.style.setProperty(`--color`, newVal);
                break;
            case `position`:
                this.elems.svg.style.setProperty(`--rotation`, `${this.positionToDeg[newVal] || 0}deg`);
                break;
            default:
                break;
        }
    }

    get color(){
        return this.getAttribute('color');
    }
    set color(val){
        if(val){
            this.setAttribute('color', val);
        }
        else {
            this.removeAttribute('color');
        }
    }
    get inverse(){
        return this.hasAttribute('inverse');
    }
    set inverse(val){
        if(val){
            this.setAttribute('color','');
        }
        else {
            this.removeAttribute('color');
        }
    }
    get position(){
        return this.getAttribute('position');
    }
    set position(val){
        if(val){
            this.setAttribute('position', val);
        }
        else {
            this.removeAttribute('position');
        }
    }
    get lead(){
        return this.hasAttribute('lead');
    }
    set lead(val){
        if(val){
            this.setAttribute('lead','');
        }
        else {
            this.removeAttribute('lead');
        }
    }

}

RootElement.registerElement('light-graphic', LightGraphic);
