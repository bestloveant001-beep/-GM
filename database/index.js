cat > index.js << 'ENDOFFILE'
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'config', 'commands');

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  
  for (const file of commandFiles) {
    const cmd = require(path.join(commandsPath, file));
    if (cmd.data && cmd.execute) {
      client.commands.set(cmd.data.name, cmd);
    }
  }
  
  console.log(`✅ โหลดคำสั่ง: ${client.commands.size} รายการ`);
} else {
  console.log(`⚠️ ไม่พบโฟลเดอร์: ${commandsPath}`);
}

client.on('ready', () => {
  console.log(`✅ เข้าสู่ระบบแล้ว: ${client.user.tag}`);
});

client.on('messageCreate', async msg => {
  if (!msg.content.startsWith('!') || msg.author.bot) return;
  
  const [name, ...args] = msg.content.slice(1).split(/ +/);
  const cmd = client.commands.get(name);
  
  if (cmd) {
    try {
      await cmd.execute(msg, args);
    } catch (e) {
      console.error(e);
      msg.reply('❌ เกิดข้อผิดพลาด');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
ENDOFFILE
             
