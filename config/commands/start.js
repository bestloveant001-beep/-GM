const { getUser, setUser } = require('../../database/index.js');

module.exports = {
  data: {
    name: 'start',
    description: 'ลงทะเบียนเริ่มต้นใช้งานบอท'
  },
  async execute(msg, args) {
    const userId = msg.author.id;
    let user = getUser(userId);
    
    if (user) {
      return msg.reply('✅ คุณได้ลงทะเบียนไว้แล้วครับ!');
    }
    
    user = setUser(userId, {
      id: userId,
      username: msg.author.username,
      joinAt: new Date().toISOString(),
      level: 1,
      exp: 0
    });
    
    msg.reply(`🎉 ยินดีต้อนรับสู่ดาวGM, ${msg.author.username}!\n✅ ลงทะเบียนสำเร็จแล้ว`);
  }
};
