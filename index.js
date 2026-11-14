const express = require('express');
const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;
console.log("Type login:", typeof login);
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('BOT TERRE PROMISE FB EN LIGNE ✅'));
app.listen(PORT, () => console.log(`Serveur OK port ${PORT}`));

console.log('Démarrage bot FB...');

// Vérifie si appstate.json existe
if (!fs.existsSync('appstate.json')) {
  console.log('❌ ERREUR: appstate.json introuvable ! Upload ton appstate.json sur GitHub');
  console.log('Le serveur web reste allumé, mais le bot FB ne peut pas se connecter sans appstate');
} else {
  try {
    const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));
    console.log('appstate.json trouvé, connexion en cours...');
    
    login({ appState: appState }, (err, api) => {
      if(err) {
        console.error('Erreur login FB:', err);
        return;
      }
      console.log('Bot connecté ✅ Terre Promise prêt !');
      
      api.listenMqtt((err, event) => {
        if(err) return;
        if(event.type === 'message' && event.body) {
          if(event.body.toLowerCase() === 'salut') {
            api.sendMessage('Salut boss, Terre Promise Bot est là ✅', event.threadID);
          }
        }
      });
    });
  } catch(e) {
    console.error('Erreur lecture appstate:', e.message);
  }
}
