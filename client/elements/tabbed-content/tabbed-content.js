import buildShadowRoot from '../buildShadowRoot.js';
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

        document.addEventListener('stiva-active', this.handleActiveChange.bind(this));
        this.elems.tabs.addEventListener('click', this.handleTabClick.bind(this));
    }
    getChildren(){
        console.log(this);
        [].slice.call(this.children).forEach( (child, i) => {
            let tabTitle = child.getAttribute('tabtitle');
            this.elems.tabs.innerHTML += `<span class="tab" data-tabtitle="${tabTitle}" >${tabTitle}</span>`;
            this.elems.panels.appendChild(child);
        });
    }
    handleActiveChange({detail}){
        if(!this.elems.panels.children.length > 0){this.getChildren();}

        let currentTab = this.elems.tabs.querySelector(`.tab.active`);
        let currentPanel = this.elems.panels.querySelector(`tab-panel.active`);
        currentTab && currentTab.classList.remove('active')
        currentPanel && currentPanel.classList.remove('active')

        let newTab = this.elems.tabs.querySelector(`[data-tabtitle="${detail.active}"]`);
        let newPanel = this.elems.panels.querySelector(`[tabtitle="${detail.active}"]`);
        newTab && newTab.classList.add('active')
        newPanel && newPanel.classList.add('active')

    }
    handleTabClick(e){
        if(e.target.classList.contains('tab')){
            stiva.update('active', () => ({active: e.target.dataset.tabtitle}));
        }
    }
}
customElements.define('tabbed-content', TabbedContent);
export default TabbedContent;
