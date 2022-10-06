const { options, channelOptions } = require('../tools/options.js');
const { pickPresence } = require('../tools/pickPresence.js');
module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    pickPresence(options, channelOptions, client);
  },
};
