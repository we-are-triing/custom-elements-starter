const {Story, Props} = require('element-storybook');

let story = new Story('site-footer');

story.addProp('href')
.addProp('slot');

story.addSlotElement('nav-item');

story.add(`base`, `
    <site-footer>
        <nav-item>Item 1</nav-item>
        <nav-item>Item 2</nav-item>
        <nav-item>Item 3</nav-item>
        <nav-item>Item 4</nav-item>
    </site-footer>
`);

module.exports = story;
