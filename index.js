const fs = require('fs');
const express = require('express');
const login = require('ws3-fca');

const app = express();

// Pour que Render ne coupe pas
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('TERRE PROMISE BOT EN LIGNE 🔥');
});
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur port ${PORT}`);
});

// Connexion Facebook
let appState = [];
try {
  appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));
} catch(e) {
  console.log('appstate.json introuvable');
}

login({ appState: appState }, (err, api) => {
  if (err) {
    console.error('ERREUR LOGIN:', err);
    return;
  }
  console.log('TERRE PROMISE CONNECTE ✅');
  
  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    // Ton code de réponse bot ici
    if (event.type === 'message') {
      // api.sendMessage('Salut boss 🔥', event.threadID);
    }
  });
});
