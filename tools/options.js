const { ActivityType, ChannelManager } = require('discord.js');

const options = [
  {
    type: ActivityType.Watching,
    text: 'Red-Flix 🟢 ',
    status: 'online',
  },
  {
    type: ActivityType.Listening,
    text: 'For Red-Flix 🔴',
    status: 'dnd',
  },
];

const channelOptions = [
  {
    text: '🟢 Server is Online',
  },
  {
    text: '🔴 Server is Offline',
  },
];

module.exports = {
  options,
  channelOptions,
};
