const {Story, Props} = require('element-storybook');

let story = new Story('main-block');

story.addProp('heading')
    .addProp('lede')
    .addProp('img')
    .addProp('--img')
    .addProp('slot');

story.add(`base`, `
    <main-block
        heading="Test Title"
        lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
    </main-block>
`)
.add(`CTA`, `
    <main-block
        heading="Test Title"
        lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
        <button>You need this!</button>
    </main-block>
`);

module.exports = story;
