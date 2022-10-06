require('dotenv').config();
const { ActivityType, ChannelManager } = require('discord.js');
const { setData } = require('./setData.js');
const { getServerStatus } = require('./getServerStatus.js');

const pickPresence = (options, channelOptions, client) => {
  let option;
  setInterval(() => {
    getServerStatus(options, option, channelOptions, client);
  }, 900000); // Interval of 15 minutes (900000ms)
};

module.exports = {
  pickPresence,
};
