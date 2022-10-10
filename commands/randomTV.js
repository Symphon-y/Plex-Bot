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
    .setName('tvshow')
    .setDescription('Replies with A Random TV Series! '),
  async execute(interaction) {
    client
      .query('/library/sections/4/all?')
      .then(function (result) {
        const library = result.MediaContainer.Metadata;
        const randomTv = Math.floor(Math.random() * library.length);
        // console.log(library);
        console.log(library[randomTv]);
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/tv?',
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: library[randomTv].title,
          },
        };

        axios(options)
          .then((data) => {
            console.log(data.data.results[0]);
            const posterPath = data.data.results[0].poster_path;
            const movieEmbed = new EmbedBuilder()
              .setColor('#b90303')
              .setTitle(library[randomTv].title)
              .setURL(
                `https://www.themoviedb.org/movie/${data.data.results[0].id}`
              )
              // .setAuthor({
              //   name: 'Some name',
              //   iconURL: 'https://i.imgur.com/AfFp7pu.png',
              //   url: 'https://discord.js.org',
              // })
              .setDescription(library[randomTv].summary)
              // .setThumbnail(
              //   `${process.env.THUMB_URL}${library[randomTv].thumb}`
              // )
              .addFields(
                // { name: 'Regular field title', value: 'Some value here' },
                // { name: '\u200B', value: '\u200B' },
                {
                  name: 'Content Rating',
                  value: `${library[randomTv].contentRating}`,
                  inline: true,
                },
                {
                  name: 'Audience Rating',
                  value: `${library[randomTv].audienceRating}`,
                  inline: true,
                }
              )
              .addFields({ name: '\u200b', value: '\u200b', inline: true })
              .setImage(`https://image.tmdb.org/t/p/original${posterPath}`)
              .setTimestamp();
            // .setFooter({
            //   text: `Directed By: ${library[randomTv].Director[0].tag}`,
            // });
            interaction.reply({ embeds: [movieEmbed] });
          })
          .catch((err) => {
            console.error('Could not connect to server', err);
          });
      })
      .catch((error) => console.log(error));
  },
};
