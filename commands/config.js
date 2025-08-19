const { SlashCommandBuilder } = require('discord.js');

let botConfig = {
  xp: false,
  moderation: false,
  giveaway: false
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('Active ou désactive certains systèmes du bot.')
    .addStringOption(option =>
      option.setName('systeme')
        .setDescription('Le système à configurer')
        .setRequired(true)
        .addChoices(
          { name: 'XP', value: 'xp' },
          { name: 'Modération', value: 'moderation' },
          { name: 'Giveaway', value: 'giveaway' }
        )
    )
    .addStringOption(option =>
      option.setName('etat')
        .setDescription('Activer ou Désactiver')
        .setRequired(true)
        .addChoices(
          { name: 'Activer', value: 'on' },
          { name: 'Désactiver', value: 'off' }
        )
    ),
  async execute(interaction) {
    const system = interaction.options.getString('systeme');
    const etat = interaction.options.getString('etat');
    botConfig[system] = (etat === 'on');
    await interaction.reply(`Système **${system}** ${etat === 'on' ? 'activé' : 'désactivé'} !`);
  }
};
