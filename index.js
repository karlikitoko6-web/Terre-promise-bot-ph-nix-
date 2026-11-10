const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1. PETIT SERVEUR POUR RENDER - NE PAS ENLEVER
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('BOT TERRE PROMISE EN LIGNE ✅ - Le bot fonctionne');
});
app.listen(PORT, () => {
  console.log(`Serveur OK port ${PORT}`);
});

// 2. TON BOT WHATSAPP - TON CODE COMMENCE ICI
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
  console.log('Scanne le QR code');
});

client.on('ready', () => {
  console.log('Bot connecté ✅ Terre Promise prêt !');
});

client.on('message', async msg => {
  // Ton code de réponses ici
  if(msg.body.toLowerCase() === 'salut'){
    msg.reply('Salut boss, Terre Promise Bot est là ✅');
  }
  // ... garde le reste de tes commandes
});

client.initialize();
