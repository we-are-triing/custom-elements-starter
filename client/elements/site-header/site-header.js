class SiteHeader extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
        this.elems = {
            logo: this.shadowRoot.querySelector('img'),
            container: this.shadowRoot.querySelector('.nav-container')
        }
        this.observer = this.watchChildren();
        this.updateChildren();
    }
    watchChildren(){
        let observer = new MutationObserver((mutations) => {
        	mutations.forEach((mutation) => {
        		this.updateChildren();
        	});
        });

        observer.observe(this, {childList: true});
        return observer;
    }

    updateChildren(){
        this.observer.disconnect();

        [].slice.apply(this.elems.container.children).forEach( child => {
            if(child.localName !== 'img'){
                child.remove()
            }
        });

        [].slice.apply(this.children).forEach(child => this.elems.container.appendChild(child.cloneNode(true)))

        this.observer.observe(this, {childList: true});
    }

    static get observedAttributes() {
        return [`logo`,`innerHTML`];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case `logo`:
                this.elems.logo.src = newVal;
                break;
            case `innerHTML`:
                this.updateChildren();
                break;
            default:
                break;
        }
    }

    get logo(){
        return this.getAttribute('logo');
    }
    set logo(val){
        if(val){
            this.setAttribute('logo', val);
        }
        else {
            this.removeAttribute('logo');
        }
    }
    get layout(){
        return this.getAttribute('layout');
    }
    set layout(val){
        if(val){
            this.setAttribute('layout', val);
        }
        else {
            this.removeAttribute('layout');
        }
    }
    get pinned(){
        return this.getAttribute('pinned');
    }
    set pinned(val){
        if(val){
            this.setAttribute('pinned', val);
        }
        else {
            this.removeAttribute('pinned');
        }
    }
    get overlay(){
        return this.getAttribute('overlay');
    }
    set overlay(val){
        if(val){
            this.setAttribute('overlay', val);
        }
        else {
            this.removeAttribute('overlay');
        }
    }
}
RootElement.registerElement('site-header', SiteHeader);
