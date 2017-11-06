import buildShadowRoot from '../buildShadowRoot.js';
class MediaBlock extends HTMLElement {
    constructor() {
        super();
        const html = `
                        <style>
                            :host {
                                display: block;
                                width: 100%;
                                margin: 4em 0 8em;
                                --lh: var(--lh-200, 1.4em);
                            }
                            figure {
                                max-width: 56em;
                                margin: 0 auto;
                            }
                            img {
                                width: 100%;
                            }
                            figcaption {
                                font-size: 0.8em;
                                line-height: var(--lh);
                            }
                        </style>
                        <figure>
                            <img class="posterframe" src="" />
                            <figcaption>
                                <b></b>
                                <div></div>
                            </figcaption>
                        </figure>
                      `;
				buildShadowRoot(html,this);
        this.titleElement = this.shadowRoot.querySelector('figcaption b');
        this.captionElement = this.shadowRoot.querySelector('figcaption div');
        this.imgElement = this.shadowRoot.querySelector('img');
    }

    static get observedAttributes() {
        return ['img','title','caption'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName) {
            case 'img':
                this.imgElement.setAttribute('src',newVal);
                break;
            case 'title':
                this.titleElement.innerHTML = newVal;
                break;
            case 'caption':
                this.captionElement.innerHTML = newVal;
                break;
            default:
                break;
        }
    }

    get img(){
        return this.getAttribute('img');
    }
    set img(val){
        if (val) {
            this.setAttribute('img', val);
        } else {
            this.removeAttribute('img');
        }
    }
    get caption(){
        return this.getAttribute('caption');
    }
    set caption(val){
        if (val) {
            this.setAttribute('caption', val);
        } else {
            this.removeAttribute('caption');
        }
    }
    get title(){
        return this.getAttribute('title');
    }
    set title(val){
        if (val) {
            this.setAttribute('title', val);
        } else {
            this.removeAttribute('title');
        }
    }

}

customElements.define('media-block', MediaBlock);
export default MediaBlock;
