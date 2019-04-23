import buildShadowRoot from './buildShadowRoot.js';
class ContentBlock extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {
                  display: block;
                  --line-height: var(--lh-300, 1.6);
              }
              section {
                  max-width: 38em;
                  margin: 2em auto;
                  line-height: var(--line-height);
              }

          </style>
          <section>
              <slot></slot>
          </section>`;
          
				buildShadowRoot(html,this);
    }
}
customElements.define('content-block', ContentBlock);
export default ContentBlock;
