const fs = require('fs');
const express = require('express');
const login = require('ws3-fca');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('BOT PHENIX OK');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur OK sur port ' + PORT);
});

let raw = fs.readFileSync('appstate.json', 'utf8');
let appState = JSON.parse(raw);

login({ appState }, (err, api) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('✅ TERRE PROMISE CONNECTE');
  api.setOptions({
    listenEvents: true,
    selfListen: false
  });
  api.listenMqtt((err, event) => {
    if (event && event.type === 'message' && event.body) {
      console.log(event.body);
      api.sendMessage('Reçu boss: ' + event.body + ' 🔥', event.threadID);
    }
  });
});
