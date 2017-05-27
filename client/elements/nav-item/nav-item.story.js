const {Story, Props} = require('element-storybook');

let story = new Story('nav-item');

story.addProp('href')
.addProp('slot');

story.add(`base`, `
    <nav-item href="#">Some Item</nav-item>
`);

module.exports = story;
