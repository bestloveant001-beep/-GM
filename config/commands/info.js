const { getUser } = require('../../database/index.js');

module.exports = {
  data: {
    name: 'info',
    description: 'ดูข้อมูลผู้ใช้'
  },
  async execute(msg, args) {
    const userId = msg.author.id;
    const userData = getUser(userId);
    
    if (!userData) {
      return msg.reply('❌ ไม่พบข้อมูล กรุณาพิมพ์ !start เพื่อลงทะเบียนก่อน');
    }
    
    msg.reply(`✅ ข้อมูลของคุณ:\n\`\`\`${JSON.stringify(userData, null, 2)}\`\`\``);
  }
};
