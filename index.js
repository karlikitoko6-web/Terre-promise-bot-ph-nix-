const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;

// FIX POUR RENDER - NE PAS ENLEVER
const http = require('http');
http.createServer((req,res) => {
  res.end('Bot en ligne');
}).listen(process.env.PORT || 10000);

// TON APPSTATE
const appstate = JSON.parse(fs.readFileSync('./appstate.json', 'utf8'));

console.log("Demarrage Terre Promise Bot...");

login({ appState: appstate }, (err, api) => {
    if(err) {
      console.log("Erreur login:", err);
      return;
    }
    console.log("Bot connecte ✅ Terre Promise pret !");
    api.setOptions({ listenEvents: true, selfListen: false, autoMarkRead: true });

    api.listenMqtt((err, event) => {
        if(err) return console.error(err);
        
        if(event.type === 'message' && event.body){
            console.log("Nouveau message:", event.body);
            const body = event.body.toLowerCase();
            
            if(body === '!ping'){
                api.sendMessage("Pong! 🏓 Je suis en ligne boss Karli !", event.threadID);
            }
            if(body === '!help'){
                api.sendMessage("📜 Commandes: !ping, !help", event.threadID);
            }
            if(body === 'salut' || body === 'yo' || body === 'hello'){
                api.sendMessage("Salut ! Terre Promise Bot est la ✅", event.threadID);
            }
        }
    });
});
