const { options } = require('../tools/options.js');

const setPresence = (client, option) => {
  client.user.setPresence({
    activities: [
      {
        name: options[option].text,
        type: options[option].type,
      },
    ],
    status: options[option].status,
  });
};

module.exports = {
  setPresence,
};
