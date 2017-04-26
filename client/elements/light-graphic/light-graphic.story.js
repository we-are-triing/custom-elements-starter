const {Story, Props} = require('element-storybook');

let story = new Story('light-graphic');

story.addProp('color')
    .addProp('inverse','bool')
    .addProp('lead','bool')
    .addProp('--color')
    .addProp('position',['start','top','end','bottom']);

story.add(`default`, `
    <light-graphic></light-graphic>
`)
.add(`start`, `
    <light-graphic position="start"></light-graphic>
`);

module.exports = story;
