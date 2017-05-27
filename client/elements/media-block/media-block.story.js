const {Story, Props} = require('element-storybook');

let story = new Story('media-block');

story.addProp('img')
    .addProp('caption')
    .addProp('title');

story.add(`base`, `
    <media-block
        title="Vehicula Mollis"
        caption="Nullam quis risus eget urna mollis ornare vel eu leo. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
        img="https://upload.wikimedia.org/wikipedia/commons/1/14/Rubber_Duck_%288374802487%29.jpg"
        >Some Item</nav-item>
`);

module.exports = story;
