import buildShadowRoot from './buildShadowRoot.js';
class SiteFooter extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {
                  display: block;
                  --link-color: #333;
                  --link-color-hover: #555;
                  margin-top: 8em;
              }
              section {
                  padding: 2em;
                  background: var(--grey, #ccc);
                  font-size: 0.8em;
              }
              ::slotted(nav-item){
                  margin-right: 1em;
              }
          </style>
          <section>
              <slot></slot>
          </section>
        `;
				buildShadowRoot(html,this);
    }
}

customElements.define('site-footer', SiteFooter);
export default SiteFooter;
