class TabbedContent extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
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
RootElement.registerElement('tabbed-content', TabbedContent);
