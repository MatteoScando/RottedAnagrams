import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const alphaButton = {
    data: new SlashCommandBuilder()
        .setName('alpha')
        .setDescription('Replies with some funny phrase!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('Pong!');
    },
};

export default alphaButton;