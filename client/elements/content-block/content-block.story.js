const {Story, Props} = require('element-storybook');

let story = new Story('content-block');

story.addProp('slot');

story.add(`default`, `
    <content-block>Some inner text</content-block>
`);

module.exports = story;
