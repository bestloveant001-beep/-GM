const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../database/index.js');
const world = require('../config/world-data.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('สถานะ')
    .setDescription('ดูข้อมูลตัวละครของคุณ'),

  async execute(interaction) {
    const user = db.getUser(interaction.user.id);
    if (!user) return interaction.reply('❌ คุณยังไม่ได้ลงทะเบียน ใช้ /ด่านตรวจ ก่อน');

    const embed = new EmbedBuilder()
      .setTitle(`👤 ข้อมูล: ${user.name}`)
      .addFields(
        { name: 'เผ่า', value: user.race, inline: true },
        { name: 'บทบาท', value: user.role, inline: true },
        { name: 'ตระกูล', value: user.clan || 'ไม่สังกัด', inline: true },
        { name: 'เงิน', value: `${user.credits} GM เครดิต`, inline: true },
        { name: 'ที่อยู่ปัจจุบัน', value: user.location, inline: true },
        { name: 'สัตว์คู่หู', value: user.companion || 'ยังไม่มี', inline: true }
      )
      .setColor('#44ff88');

    await interaction.reply({ embeds: [embed] });
  }
};
