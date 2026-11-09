const fs = require('fs');
const express = require('express');
const login = require('ws3-fca');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req,res)=> res.send('TERRE PROMISE PHENIX BOT OK'));
app.listen(PORT, '0.0.0.0', ()=> console.log('Serveur OK port', PORT));

let appState = JSON.parse(fs.readFileSync('appstate.json','utf8'));

login({appState}, (err, api)=>{
 if(err){ console.error(err); return; }
 console.log('✅ TERRE PROMISE CONNECTE AU GROUPE !');
 api.setOptions({listenEvents:true, selfListen:false, listenSelf:false});
 api.listenMqtt((err, event)=>{
  if(err) return;
  if(event.type==='message' && event.body){
    console.log('Message:', event.body, 'Thread:', event.threadID);
    // Ne répond que s'il est dans la conversation
    api.sendMessage(`Reçu boss: ${event.body} 🔥`, event.threadID, (err)=>{
      if(err) console.log('Erreur envoi:', err.error);
    });
  }
 });
});
