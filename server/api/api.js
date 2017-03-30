const content = require('../data/content.js');
const header = require('../data/header.js');
const footer = require('../data/footer.js');
const userData = require('../data/user-data.js');
const social = require('../data/social.js');

module.exports = ({id, template}) => {
    return {
        content: content[id],
        header,
        footer,
        userData,
        social
    }
};
