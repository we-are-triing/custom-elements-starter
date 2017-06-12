const {Story, Props} = require('element-storybook');

let story = new Story('tab-panel');

story.addProp('slot');

story.add(`default`, `
    <tab-panel tabTitle="some title">Some inner text</tab-panel>
`);

module.exports = story;
