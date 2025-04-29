import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

if (!process.env.DISCORD_TOKEN) {
  throw new Error('DISCORD_TOKEN is not defined in the environment variables.');
}
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  if (!process.env.APPLICATION_ID) {
    throw new Error('APPLICATION_ID is not defined in the environment variables.');
  }
  await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}