const {Story, Props} = require('element-storybook');

let story = new Story('main-block');

story.addProp('title')
    .addProp('lede')
    .addProp('img')
    .addProp('--img')
    .addProp('slot');

story.add(`base`, `
    <main-block
        title="Test Title"
        lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
    </main-block>
`);

module.exports = story;
