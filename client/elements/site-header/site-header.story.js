const {Story, Props} = require('element-storybook');

let story = new Story('site-header');

story.addProp('logo')
.addProp('layout', ['left','center'])
.addProp('pinned', 'bool')
.addProp('slot');

story.addSlotElement(['nav-item', 'main-block', 'content-block']);

let items = `<nav-item>Item 1</nav-item>
<nav-item>Item 2</nav-item>
<nav-item>Item 3</nav-item>
<nav-item>Item 4</nav-item>`;

let mainBlock = `
<main-block
    heading="Test Title"
    lede="Test Lede: Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
    <button>You need this!</button>
</main-block>
`;

let content = `
    <content-block>Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Cras mattis consectetur purus sit amet fermentum. Nullam id dolor id nibh ultricies vehicula ut id elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui.</content-block>
    <content-block>Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui.</content-block>
    <content-block>Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sed odio dui.</content-block>
`;

story.add(`base`, `
    <site-header
        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rubber_Duck_%288374802487%29.jpg/220px-Rubber_Duck_%288374802487%29.jpg"
        layout="center"
        >
        ${items}
    </site-header>
    ${mainBlock}
    ${content}

`)
.add(`pinned`, `
    <site-header
        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rubber_Duck_%288374802487%29.jpg/220px-Rubber_Duck_%288374802487%29.jpg"
        layout="center"
        pinned
        >
        ${items}
    </site-header>
    ${mainBlock}
    ${content}
`)
.add(`overlay`, `
    <site-header
        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rubber_Duck_%288374802487%29.jpg/220px-Rubber_Duck_%288374802487%29.jpg"
        layout="center"
        overlay
        >
        ${items}
    </site-header>
    ${mainBlock}
    ${content}
`);

module.exports = story;
