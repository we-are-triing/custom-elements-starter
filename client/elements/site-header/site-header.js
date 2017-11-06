import buildShadowRoot from '../buildShadowRoot.js';
class SiteHeader extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {
                  display: block;
                  --header-bg: var(--main, RGBA(0, 69, 99, 1));
                  --header-bg-trans: var(--main-trans, RGBA(0, 69, 99, 0.7));
                  --active: var(--highlight);
              }
              section {
                  width: 100%;
                  padding: 1.5em;
                  background: var(--header-bg);
                  box-sizing: border-box;
              }
              .nav-container {
                  width: 60%;
                  margin: 0 auto;
                  display: grid;
                  align-items: center;
                  grid-gap: 1em;
                  justify-content: center;
                  grid-template-areas: ". . logo . .";
              }
              :host([pinned]) section{
                  position: fixed;
              }
              :host([overlay]) section{
                  position: absolute;
              }
              :host([overlay]) section, :host([pinned]) section{
                  left: 50%;
                  transform: translateX(-50%);
                  background: var(--header-bg-trans);
              }
              img {
                  grid-area: logo;
                  max-width: 130px;
              }
              nav-item {
                  color: white;
              }
          </style>
          <section>
              <div class="nav-container">
                  <img />
              </div>
          </section>
        `;
				buildShadowRoot(html,this);
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
customElements.define('site-header', SiteHeader);
export default SiteHeader;
