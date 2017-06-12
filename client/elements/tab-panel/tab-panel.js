class TabPanel extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
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
RootElement.registerElement('tab-panel', TabPanel);
