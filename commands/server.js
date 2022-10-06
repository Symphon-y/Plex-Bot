require('dotenv').config();
const {
  SlashCommandBuilder,
  GuildChannel,
  channel,
  Message,
  EmbedBuilder,
} = require('discord.js');
const axios = require('axios');

const { options, channelOptions } = require('../tools/options.js');
let option;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with Server Status! '),
  async execute(interaction) {
    axios
      .get(process.env.PLEX_URL)
      .then((data) => {
        if (data.status === 200) {
          option = 0;
        } else {
          option = 1;
        }
        interaction.reply(channelOptions[option].text);
        interaction.channel
          .setName(channelOptions[option].text)
          .then((newChannel) =>
            console.log(`Channel's new name is ${newChannel.name}`)
          )
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        option = 1;
        console.log('The error is with the axios request.');
      });
  },
};
