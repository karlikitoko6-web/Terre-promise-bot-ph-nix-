const fs = require('fs');
const login = require('ws3-fca');
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.get('/', (req,res)=>res.send('BOT EN LIGNE'));
app.listen(process.env.PORT||10000, ()=>console.log('Serveur OK'));

const appState = JSON.parse(fs.readFileSync('appstate.json','utf8'));
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

login({appState}, (err, api)=>{
  if(err){ console.error(err); return; }
  console.log('BOT CONNECTE');
  api.listenMqtt((err,event)=>{
    if(event.body && event.body.startsWith('!bot')){
      const q = event.body.replace('!bot','');
      openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{role:'user',content:q}]
      }).then(r=> api.sendMessage(r.choices[0].message.content, event.threadID));
    }
  });
});
