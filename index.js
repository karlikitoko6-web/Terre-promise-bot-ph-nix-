const express = require('express');
const fs = require('fs');
const login = require('ws3-fca');
const OpenAI = require('openai');

// 1. SERVEUR POUR RENDER - OBLIGATOIRE
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('BOT TERRE PROMISE FB EN LIGNE ✅');
});
app.listen(PORT, () => {
  console.log(`Serveur OK port ${PORT}`);
});

// 2. CONFIG OPENAI SI TU L'UTILISES
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'ta_cle_ici'
});

// 3. BOT FB WS3-FCA
const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

login({ appState: appState }, (err, api) => {
  if(err) {
    console.error('Erreur login FB:', err);
    return;
  }

  console.log('Bot connecté ✅ Terre Promise prêt !');
  
  api.listenMqtt(async (err, event) => {
    if(err) return console.error(err);
    
    if(event.type === 'message' && event.body) {
      console.log(`Message de ${event.senderID}: ${event.body}`);
      
      if(event.body.toLowerCase() === 'salut') {
        api.sendMessage('Salut boss, Terre Promise Bot est là ✅', event.threadID);
      }
      // Ajoute tes autres commandes ici
    }
  });
});
