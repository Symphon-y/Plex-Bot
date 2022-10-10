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
    .setName('disneymovienight')
    .setDescription('Replies with A Random Disney Movie! '),
  async execute(interaction) {
    client
      .query('/library/sections/2/all?')
      .then(function (result) {
        const library = result.MediaContainer.Metadata;
        const randomMovie = Math.floor(Math.random() * library.length);
        // console.log(library);
        console.log(library[randomMovie]);
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie?',
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: library[randomMovie].title,
          },
        };

        axios(options)
          .then((data) => {
            console.log(data.data.results[0]);
            const posterPath = data.data.results[0].poster_path;
            const movieEmbed = new EmbedBuilder()
              .setColor('#b90303')
              .setTitle(library[randomMovie].title)
              .setURL(
                `https://www.themoviedb.org/movie/${data.data.results[0].id}`
              )
              // .setAuthor({
              //   name: 'Some name',
              //   iconURL: 'https://i.imgur.com/AfFp7pu.png',
              //   url: 'https://discord.js.org',
              // })
              .setDescription(library[randomMovie].summary)
              // .setThumbnail(
              //   `${process.env.THUMB_URL}${library[randomMovie].thumb}`
              // )
              .addFields(
                // { name: 'Regular field title', value: 'Some value here' },
                // { name: '\u200B', value: '\u200B' },
                {
                  name: 'Content Rating',
                  value: `${library[randomMovie].contentRating}`,
                  inline: true,
                },
                {
                  name: 'Critic Rating',
                  value: `${library[randomMovie].rating}`,
                  inline: true,
                }
              )
              .addFields({
                name: 'Audience Rating',
                value: `${library[randomMovie].audienceRating}`,
                inline: true,
              })
              .setImage(`https://image.tmdb.org/t/p/original${posterPath}`)
              .setTimestamp()
              .setFooter({
                text: `Directed By: ${library[randomMovie].Director[0].tag}`,
              });
            interaction.reply({ embeds: [movieEmbed] });
          })
          .catch((err) => {
            console.error('Could not connect to server', err);
          });
      })
      .catch((error) => console.log(error));
  },
};
