const {Story, Props} = require('element-storybook');

let story = new Story('title-block');

story.addProp('title')
    .addProp('lede')
    .addProp('slot');

story.add(`base`, `
    <title-block
        title="Test Title"
        lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
    </title-block>
`);

module.exports = story;
