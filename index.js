const fs = require('fs');
const login = require('ws3-fca');
const express = require('express');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('BOT TERRE PROMISE PH-NIX EN LIGNE ✅');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur OK sur port ' + PORT);
});

// Config OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

const config = {
  appState: appState,
  autoMarkDelivery: false,
  selfListen: false
};

console.log('Connexion à Facebook...');

login(config, (err, api) => {
  if (err) {
    console.error('ERREUR LOGIN:', err);
    return;
  }

  console.log('✅ BOT CONNECTÉ !');

  api.setOptions({
    listenEvents: true,
    selfListen: false,
    autoMarkRead: true
  });

  api.listenMqtt(async (err, event) => {
    if (err) {
      console.error(err);
      return;
    }

    if (event.type === 'message' && event.body) {
      const msg = event.body.toLowerCase();
      
      if (msg.startsWith('!bot') || msg.startsWith('!terre')) {
        const question = event.body.replace(/!bot|!terre/i, '').trim();
        if (!question) {
          api.sendMessage('Oui boss ? Pose ta question après !bot', event.threadID);
          return;
        }

        try {
          api.sendMessage('⏳ Terre Promise réfléchit...', event.threadID);
          
          const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {role: 'system', content: 'Tu es Terre Promise Bot Ph-Nix, un assistant sympa et puissant créé par Karli.'},
              {role: 'user', content: question}
            ]
          });

          const reponse = completion.choices[0].message.content;
          api.sendMessage(reponse, event.threadID);

        } catch (e) {
          api.sendMessage('Erreur IA: ' + e.message + ' - Vérifie OPENAI_API_KEY sur Render', event.threadID);
        }
      }
    }
  });
});
