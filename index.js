require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// โหลดคำสั่ง
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).filter(f => f.endsWith('.js')).forEach(file => {
  const cmd = require(path.join(commandsPath, file));
  if ('data' in cmd && 'execute' in cmd) commands.push(cmd.data.toJSON());
});

// ลงทะเบียนคำสั่ง
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
(async () => {
  try {
    console.log('กำลังลงทะเบียนคำสั่ง...');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands }
    );
    console.log('✅ คำสั่งพร้อมใช้งาน');
  } catch (e) { console.error(e); }
})();

client.commands = new Collection();
fs.readdirSync(commandsPath).filter(f => f.endsWith('.js')).forEach(file => {
  const cmd = require(path.join(commandsPath, file));
  client.commands.set(cmd.data.name, cmd);
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

client.on('ready', () => {
  console.log(`✅ เข้าสู่ระบบในชื่อ ${client.user.tag}`);
  client.user.setActivity('/ด่านตรวจ — เริ่มผจญภัย', { type: 'PLAYING' });
});

client.login(process.env.DISCORD_BOT_TOKEN);
  
