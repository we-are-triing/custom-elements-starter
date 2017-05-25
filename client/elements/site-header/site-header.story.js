const {Story, Props} = require('element-storybook');

let story = new Story('site-header');

story.addProp('logo')
.addProp('layout', ['left','center'])
.addProp('pinned', 'bool')
.addProp('slot');

story.addSlotElement(['nav-item', 'main-block']);

story.add(`base`, `
    <site-header
        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rubber_Duck_%288374802487%29.jpg/220px-Rubber_Duck_%288374802487%29.jpg"
        layout="center"
        pinned
        >
        <nav-item>Item 1</nav-item>
        <nav-item>Item 2</nav-item>
        <nav-item>Item 3</nav-item>
        <nav-item>Item 4</nav-item>
    </site-header>
    <main-block
        heading="Test Title"
        lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
        <button>You need this!</button>
    </main-block>
`);

module.exports = story;
