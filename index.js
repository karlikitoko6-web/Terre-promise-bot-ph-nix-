const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;

const appstate = JSON.parse(fs.readFileSync('./appstate.json', 'utf8'));

console.log("Démarrage Terre Promise Bøt...");

login({ appState: appstate }, (err, api) => {
    if(err) return console.error("Erreur login:", err);
    
    console.log("Bot connecté ✅ Terre Promise prêt !");
    api.setOptions({ listenEvents: true, selfListen: false, autoMarkRead: true });

    api.listenMqtt((err, event) => {
        if(err) return console.error(err);
        console.log("Nouvel event:", event.type, event.body || "");
        
        if(event.type === 'message' && event.body){
            const body = event.body.toLowerCase();
            
            if(body === '!ping' || body === '!help' || body === 'help' || body === 'salut' || body === 'yo'){
                api.sendMessage(`Salut ! Je suis en ligne ✅\nTu as dit: ${event.body}\nCommandes: !ping, !help`, event.threadID);
            }
            if(body === '!ping'){
                api.sendMessage("Pong! 🏓 Terre Promise Bøt est en ligne boss Karli !", event.threadID);
            }
            if(body === '!help'){
                api.sendMessage("📜 Liste d'aide:\n!ping = test\n!help = aide\nJe fonctionne !", event.threadID);
            }
        }
    });
});
