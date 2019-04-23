import buildShadowRoot from './buildShadowRoot.js';
class TabbedContent extends HTMLElement {
    constructor() {
        super();
        const html = `
          <style>
              :host {
                  display: block;
                  --border: #eee;
                  --main: #eee;
                  margin: 6em 0 4em;
                  --lh: var(--lh-300, 1.6em);
              }
              section {
                  max-width: 46em;
                  margin: 0 auto;
                  line-height: var(--lh);
              }
              tab-panel{
                  display: none;
              }
              tab-panel.active{
                  display: block;
              }
              .tabs {
                  border-bottom: 1px solid var(--border);
              }
              .tab {
                  display: inline-block;
                  padding: 0.3em 0.6em;
                  cursor: pointer;
                  background: var(--main);
                  border: 1px solid var(--border);
                  position:relative;
                  top: 1px;
                  font-size: 0.8em;
              }
              .tab.active {
                  background: white;
                  border-bottom-color: white;
              }
          </style>
          <section class="tabs"></section>
          <section class="content"></section>
        `;
				buildShadowRoot(html,this);
        this.elems = {
            tabs: this.shadowRoot.querySelector('.tabs'),
            panels: this.shadowRoot.querySelector('.content')
        };
        this.elems.tabs.addEventListener('click', this.handleActiveChange.bind(this));
        this.getChildren();
    }
    getChildren(){
        const hasActive = this.elems.tabs.querySelectorAll('.active').length === 0;
        [].slice.call(this.children).forEach( (child, i) => {
            let tabTitle = child.getAttribute('tabtitle');
            this.elems.tabs.innerHTML += `<span class="tab${hasActive && i === 0 ? ` active`:``}" data-tabtitle="${tabTitle}" >${tabTitle}</span>`;
            if(hasActive && i === 0){
                child.classList.add('active');
            }
            this.elems.panels.appendChild(child);
        });
    }
    handleActiveChange(e){
        if(e.target.classList.contains('tab')) {
            const active = e.target.dataset.tabtitle;

            if (!this.elems.panels.children.length > 0) {
                this.getChildren();
            }

            let currentTab = this.elems.tabs.querySelector(`.tab.active`);
            let currentPanel = this.elems.panels.querySelector(`tab-panel.active`);
            currentTab && currentTab.classList.remove('active');
            currentPanel && currentPanel.classList.remove('active');

            let newTab = this.elems.tabs.querySelector(`[data-tabtitle="${active}"]`);
            let newPanel = this.elems.panels.querySelector(`[tabtitle="${active}"]`);
            newTab && newTab.classList.add('active');
            newPanel && newPanel.classList.add('active');
        }

    }
}
customElements.define('tabbed-content', TabbedContent);
export default TabbedContent;
