const fs = require('fs');
const express = require('express');
const app = express();

// 1. OUVRE LE PORT DIRECT - Render est content
app.get('/', (req,res)=>res.send('BOT TERRE PROMISE EN LIGNE ✅'));
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=>console.log('Serveur OK port '+PORT));

// 2. Lance le bot après, sans planter même si pas de clé
try {
  const fca = require('ws3-fca');
  const login = fca.default || fca;
  const OpenAI = require('openai');
  
  if(!fs.existsSync('appstate.json')){
    console.log('appstate.json manquant - ajoute le sur GitHub');
  } else {
    const appState = JSON.parse(fs.readFileSync('appstate.json','utf8'));
    let openai = null;
    if(process.env.OPENAI_API_KEY){
      openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
      console.log('OpenAI OK');
    } else {
      console.log('ATTENTION: OPENAI_API_KEY manquant sur Render, le bot répondra sans IA');
    }

    console.log('Connexion FB...');
    login({appState}, (err, api)=>{
      if(err){ console.error('LOGIN FB ECHOUE:', err.error || err); return; }
      console.log('✅ BOT CONNECTE A FACEBOOK');
      api.setOptions({listenEvents:true, selfListen:false});
      api.listenMqtt((err, event)=>{
        if(event && event.type==='message' && event.body){
          if(event.body.toLowerCase().startsWith('!bot')){
            const q = event.body.slice(4).trim();
            if(!q) return api.sendMessage('Oui boss ?', event.threadID);
            if(!openai) return api.sendMessage('Bot connecté mais pas de clé OpenAI configurée sur Render', event.threadID);
            openai.chat.completions.create({model:'gpt-3.5-turbo', messages:[{role:'user', content:q}]}).then(r=>{
              api.sendMessage(r.choices[0].message.content, event.threadID);
            }).catch(e=>console.error(e));
          }
        }
      });
    });
  }
} catch(e){
  console.error('ERREUR BOT:', e.message);
}
