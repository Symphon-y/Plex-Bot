const setData = (options, option, channelOptions, client) => {
  client.user.setPresence({
    activities: [
      {
        name: options[option].text,
        type: options[option].type,
      },
    ],
    status: options[option].status,
  });
  channel = client.channels
    .fetch(process.env.CHANNEL_ID)
    .then((newChannel) => {
      newChannel
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
    });
};

module.exports = {
  setData,
};
