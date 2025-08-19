const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Lance un giveaway sur le serveur.')
    .addStringOption(option =>
      option.setName('prix')
        .setDescription('Le prix à gagner')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duree')
        .setDescription('Durée du giveaway en secondes (ex: 60)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const prix = interaction.options.getString('prix');
    const duree = interaction.options.getInteger('duree');

    const message = await interaction.reply({ content: `🎉 GIVEAWAY 🎉\nPrix : **${prix}**\nRéagissez 🎉 pour participer !\nFin dans ${duree} secondes !`, fetchReply: true });
    await message.react('🎉');

    setTimeout(async () => {
      const fetchedMessage = await interaction.channel.messages.fetch(message.id);
      const users = await fetchedMessage.reactions.cache.get('🎉').users.fetch();
      const participants = users.filter(u => !u.bot);
      if (participants.size === 0) {
        await interaction.followUp('Aucun participant, pas de gagnant.');
        return;
      }
      const winner = participants.random();
      await interaction.followUp(`Félicitations à ${winner} qui remporte **${prix}** !`);
    }, duree * 1000);
  }
};
