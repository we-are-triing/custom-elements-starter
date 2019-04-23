import buildShadowRoot from './buildShadowRoot.js';
class TitleBlock extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {
                  display: block;
                  --lede-lh: var(--lh-300, 1.6);
              }
              * {
                  box-sizing: border-box;
              }
              section {
                  text-align: center;
                  padding: 6em 2em 3em;
              }
              h1 {
                  font-size: 3em;
                  margin: 0;
              }
              .lede {
                  max-width: 70%;
                  margin: 2em auto;
                  font-size: 0.8em;
                  line-height: var(--lede-lh);
              }

          </style>
          <section>
              <h1></h1>
              <p class="lede"></p>
          </section>
        `;
				buildShadowRoot(html,this);
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
customElements.define('title-block', TitleBlock);
export default TitleBlock;
