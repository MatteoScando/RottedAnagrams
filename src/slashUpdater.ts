import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const DS_TOKEN = process.env.DISCORD_TOKEN
const DS_APP_ID = process.env.APPLICATION_ID

if (!DS_TOKEN) {
  throw new Error('DISCORD_TOKEN is not defined in the environment variables.');
}

// { version: '10' }
const rest = new REST().setToken(DS_TOKEN);

const slashRegister = async () => {
  try {
    console.log('Updating slash commands...');
  
    if (!DS_APP_ID) {
      throw new Error('APPLICATION_ID is not defined in the environment variables.');
    }

    await rest.put(Routes.applicationCommands(DS_APP_ID), {
      body: [
        new SlashCommandBuilder()
          .setName('aneurysm')
          .setDescription('Replies with racist and blasphemous anagrams!'),
        
        new SlashCommandBuilder()
          .setName('daily-shit')
          .setDescription('A stupid generated quote of the day!')
      ]
    });
  
    console.log('Successfully reloaded application commands.');
  } catch (error) {
    console.error(error);
  }
}

slashRegister();