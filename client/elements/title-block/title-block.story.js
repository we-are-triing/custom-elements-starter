const {Story, Props} = require('element-storybook');

let story = new Story('title-block');

story.addProp('heading')
    .addProp('lede');

story.add(`base`, `
    <title-block
        heading="Test Title"
        lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
    </title-block>
`);

module.exports = story;
