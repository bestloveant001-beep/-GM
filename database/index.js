require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
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

// โหลดคำสั่ง — เส้นทางที่ถูกต้อง ✅
const commandsPath = path.join(__dirname, 'config', 'commands');
const commands = [];

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const cmd = require(path.join(commandsPath, file));
    if (cmd.data && cmd.execute) {
      client.commands.set(cmd.data.name, cmd);
      commands.push(cmd.data.toJSON());
    }
  }
  console.log(`✅ โหลดคำสั่ง: ${client.commands.size} รายการ`);
} else {
  console.log(`⚠️ ไม่พบโฟลเดอร์: ${commandsPath}`);
}

client.on('ready', async () => {
  console.log(`✅ เข้าสู่ระบบในชื่อ ${client.user.tag}`);
  
  // ลงทะเบียนคำสั่ง
  if (commands.length > 0 && process.env.DISCORD_CLIENT_ID) {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
      console.log('🔄 กำลังลงทะเบียนคำสั่ง...');
      await rest.put(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
        { body: commands }
      );
      console.log('✅ ลงทะเบียนคำสั่งสำเร็จ!');
    } catch (e) { console.error(e); }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;
  try { await cmd.execute(interaction); }
  catch (e) {
    console.error(e);
    await interaction.reply({ content: '❌ เกิดข้อผิดพลาด', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
