import buildShadowRoot from '../buildShadowRoot.js';
class TabPanel extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {

              }
              section {
                  padding: 1em;
              }
          </style>
          <section>
              <slot></slot>
          </section>
        `;
				buildShadowRoot(html,this);
    }
    get tabtitle(){
        return this.getAttribute('tabtitle');
    }
    set tabtitle(val){
        if(val){
            this.setAttribute('tabtitle', val);
        }
        else {
            this.removeAttribute('tabtitle');
        }
    }
}
customElements.define('tab-panel', TabPanel);
export default TabPanel;
