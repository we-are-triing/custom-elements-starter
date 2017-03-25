class RootComponent extends HTMLElement {
    constructor(){
        super();
    }
    buildShadowRoot(id = '') {
        const templateSelector = `template${id !== '' ? `#${id}` : ``}`;
        const template = RootComponent.ownerDocuments[this.localName].querySelector(templateSelector);
        typeof ShadyCSS !== 'undefined' && ShadyCSS.prepareTemplate(template, this.localName);
        const shadowRoot = this.attachShadow({mode: `open`});
        
        shadowRoot.appendChild(template.content.cloneNode(true), true);
        return shadowRoot;
    }
    static registerElement(name, constructor, options) {
        const ownerDoc = typeof HTMLImports !== 'undefined' && !HTMLImports.useNative ? HTMLImports.importForElement(document.currentScript) : document.currentScript.ownerDocument;
        RootComponent.ownerDocuments[constructor.name] = ownerDoc;
        RootComponent.ownerDocuments[name] = ownerDoc;
        customElements.define(name, constructor, options);
    }
}
RootComponent.ownerDocuments = {};
