import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'aneurysm') {
    // mettere che è un massimo di 10 parole altrimenti non passa alla generazione
    await interaction.reply('Not working at the moment nickger');
  } else if (interaction.commandName === 'daily-shit') {
    // la frase deve essere sempre la stessa e se un utente l'ha già richiesta lo insulta
    
    console.log("questo doverebbe essere l'utente che sta scrivendo:", client.user?.id) //funziona !
    await interaction.reply('niggers are always the best picker')
  }
});

client.login(process.env.DISCORD_TOKEN);