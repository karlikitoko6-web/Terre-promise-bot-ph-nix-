const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', (req,res)=>res.send('BOT TERRE PROMISE EN LIGNE ✅'));
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=>console.log('Serveur OK port '+PORT));

// On charge le bot seulement après
try {
  const login = require('ws3-fca');
  const OpenAI = require('openai');
  const appState = JSON.parse(fs.readFileSync('appstate.json','utf8'));
  const openai = process.env.OPENAI_API_KEY ? new OpenAI({apiKey: process.env.OPENAI_API_KEY}) : null;
  
  console.log('AppState OK, connexion FB...');
  login({appState}, (err, api)=>{
    if(err){ console.error('LOGIN FB ECHOUE:', err); return; }
    console.log('✅ BOT CONNECTE A FACEBOOK');
    api.setOptions({listenEvents:true, selfListen:false});
    api.listenMqtt((err, event)=>{
      if(event && event.type=='message' && event.body && event.body.toLowerCase().startsWith('!bot')){
        const q = event.body.slice(4).trim();
        if(!q) return api.sendMessage('Oui boss ?', event.threadID);
        if(!openai) return api.sendMessage('Pas de clé OpenAI sur Render', event.threadID);
        openai.chat.completions.create({
          model:'gpt-3.5-turbo',
          messages:[{role:'user', content:q}]
        }).then(r=> api.sendMessage(r.choices[0].message.content, event.threadID));
      }
    });
  });
} catch(e){
  console.error('ERREUR LANCEMENT BOT:', e.message);
  console.log('Le serveur web reste en ligne pour debug');
}
