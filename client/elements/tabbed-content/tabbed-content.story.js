const {Story, Props} = require('element-storybook');

let story = new Story('tabbed-content');

story.addProp('slot')
    .addProp('stiva-active', { "active": "tab1" });
story.addSlotElement('tab-panel');

story.add(`default`, `
    <tabbed-content>
        <tab-panel tabtitle="tab1" >
            Content for panel 1
        </tab-panel>
        <tab-panel tabtitle="tab2" >
            Content for panel 2
        </tab-panel>
        <tab-panel tabtitle="tab3" >
            Content for panel 3
        </tab-panel>
    </tabbed-content>
`);

module.exports = story;
