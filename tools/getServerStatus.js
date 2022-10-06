require('dotenv').config();
const { setData } = require('./setData.js');
const axios = require('axios');

const getServerStatus = (options, option, channelOptions, client) => {
  option = option || 1;
  axios
    .get(process.env.PLEX_URL)
    .then((data) => {
      if (data.status === 200) {
        option = 0;
      } else {
        option = 1;
      }
      setData(options, option, channelOptions, client);
    })
    .catch((err) => {
      console.log(err);
      option = 1;
      setData(options, option, channelOptions, client);
      console.log('The error is with the axios request.');
    });
};
module.exports = {
  getServerStatus,
};
