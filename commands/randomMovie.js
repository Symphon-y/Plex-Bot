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
const PlexAPI = require('plex-api');
const client = new PlexAPI('192.168.1.25');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Replies with A Random Movie! '),
  async execute(interaction) {
    client
      .query('/library/sections/1/all?')
      .then(function (result) {
        const library = result.MediaContainer.Metadata;
        const randomMovie = Math.floor(Math.random() * library.length);
        // console.log(library);
        console.log(library[randomMovie]);
        interaction.reply(library[randomMovie].title);
      })
      .catch((err) => {
        console.error('Could not connect to server', err);
      });
  },
};
