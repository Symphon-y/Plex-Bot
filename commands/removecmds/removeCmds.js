require('dotenv').config();
const { REST, Routes } = require('discord.js');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const COMMAND_TO_DELETE = process.env.DELETE_COMMAND;

const rest = new REST({ version: '10' }).setToken(token);

// ...

// for guild-based commands
rest
  .delete(Routes.applicationGuildCommand(clientId, guildId, COMMAND_TO_DELETE))
  .then(() => console.log('Successfully deleted guild command'))
  .catch(console.error);

// for global commands
// rest
//   .delete(Routes.applicationCommand(clientId, 'commandId'))
//   .then(() => console.log('Successfully deleted application command'))
//   .catch(console.error);
