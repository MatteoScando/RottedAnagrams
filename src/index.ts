import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import alphaButton from './commands/utility/alpha';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Estendi il tipo Client per includere la collection dei comandi
declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, typeof alphaButton>
    }
}

// Inizializza la collection dei comandi
client.commands = new Collection();

// Aggiungi il comando alpha alla collection
client.commands.set(alphaButton.data.name, alphaButton);

client.once(Events.ClientReady, () => {
    console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);