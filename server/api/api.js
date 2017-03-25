const content = require('../data/content.js');
const header = require('../data/header.js');
const footer = require('../data/footer.js');
const userData = require('../data/user-data.js');

module.exports = ({id, template}) => {
    return {
        content: content[id],
        header,
        footer,
        userData
    }
};
