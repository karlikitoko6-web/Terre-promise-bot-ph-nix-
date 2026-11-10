const fs = require('fs');
const login = require('ws3-fca');
const express = require('express');

let OpenAI;
try { OpenAI = require('openai'); } catch(e){ console.log('OpenAI non installé'); }

const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req,res)=> res.send('BOT TERRE PROMISE EN LIGNE ✅'));
app.listen(PORT,'0.0.0.0',()=> console.log('Serveur OK '+PORT));

let appState;
try {
  appState = JSON.parse(fs.readFileSync('appstate.json','utf8'));
} catch(e){
  console.error('ERREUR appstate.json manquant ou invalide:', e.message);
  // on ne quitte pas, on laisse le serveur tourner pour voir le log
}

console.log('Connexion FB...');

let openai = null;
if (OpenAI && process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

login({appState}, async (err, api) => {
  if (err) { console.error('ERREUR LOGIN FB:', err); return; }
  console.log('✅ BOT CONNECTÉ !');
  api.setOptions({listenEvents:true,selfListen:false,autoMarkRead:true});
  
  api.listenMqtt(async (err,event)=>{
    if(err) return;
    if(event.type==='message' && event.body){
      const body = event.body.trim();
      const low = body.toLowerCase();
      if(low.startsWith('!bot') || low.startsWith('!terre')){
        const question = body.replace(/!bot|!terre/i,'').trim();
        if(!question){ return api.sendMessage('Oui boss ? Tape !bot + ta question', event.threadID); }
        if(!openai){ return api.sendMessage('Je suis en ligne mais clé OpenAI non configurée sur Render.', event.threadID); }
        try{
          api.sendMessage('⏳ Je réfléchis...', event.threadID);
          const comp = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[{role:'system',content:'Tu es Terre Promise Bot Ph-Nix créé par Karli'},{role:'user',content:question}]
          });
          api.sendMessage(comp.choices[0].message.content, event.threadID);
        }catch(e){ api.sendMessage('Erreur IA: '+e.message, event.threadID); }
      }
    }
  });
});
