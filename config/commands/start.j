const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../database/user-db.js');
const world = require('../config/world-data.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ด่านตรวจ')
    .setDescription('มาถึงด่านตรวจคนเข้าเมืองดาว GM — จุดเริ่มต้นทุกคน'),

  async execute(interaction) {
    const user = db.getUser(interaction.user.id);
    if (user) {
      return interaction.reply(`✅ คุณเคยลงทะเบียนแล้วครับ\nชื่อ: ${user.name}\nเงิน: ${user.credits} GM เครดิต\nอยู่ที่: ${user.location}`);
    }

    const embed = new EmbedBuilder()
      .setTitle('🛸 ด่านตรวจคนเข้าเมือง — ดาว GM')
      .setDescription(`ยานของคุณลงจอดที่ท่าอวกาศกลางนครอินฟินิตี้...
แสงสีครามอมม่วงของท้องฟ้าต้อนรับคุณ เจ้าหน้าที่เดินเข้ามา:

> "ยินดีต้อนรับสู่ดาว GM! กรุณาพิมพ์ \`/สร้างตัวละคร\` เพื่อลงทะเบียน"

📋 ของที่จะได้รับเมื่อเสร็จสิ้น:
• เงินเริ่มต้น: **${world.start.credits} GM เครดิต**
• ตรา GM + อุปกรณ์พื้นฐานครบชุด
• สิทธิ์สำรวจทั่วดาว`)
      .setColor('#44aaff');

    await interaction.reply({ embeds: [embed] });
  }
};
