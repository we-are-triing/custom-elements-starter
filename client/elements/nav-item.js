import buildShadowRoot from './buildShadowRoot.js';
class NavItem extends HTMLElement {
    constructor() {
        super();
        const html = `
                        <style>
                            :host {
                                color: blue;
                                --color: var(--link-color, inherit);
                                --color-hover: var(--link-color-hover, inherit);
                                --underline: var(--highlight, transparent);
                            }
                            a {
                                color: var(--color);
                                text-decoration: none;
                                border-bottom: 1px solid transparent;
                            }
                            a:hover {
                                color: var(--color-hover);
                                border-bottom: 1px solid var(--underline);
                            }
                        </style>
                        <a href=""><slot></slot></a>
                      `;
				buildShadowRoot(html,this);
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

customElements.define('nav-item', NavItem);
export default NavItem;
