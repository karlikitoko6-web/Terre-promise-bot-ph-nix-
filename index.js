const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;
const http = require('http');
http.createServer((req,res)=>{res.end('Terre Promise 200 Jeux - Live');}).listen(process.env.PORT||10000);
const appstate = JSON.parse(fs.readFileSync('./appstate.json','utf8'));
let db={eco:{},pets:{}}; try{db=JSON.parse(fs.readFileSync('./db.json','utf8'))}catch(e){db={eco:{},pets:{}}}
function getBal(id){if(!db.eco[id])db.eco[id]=5000;return db.eco[id]}
function save(){fs.writeFileSync('./db.json',JSON.stringify(db))}
let startTime=Date.now();

login({appState:appstate},(err,api)=>{
 if(err) return console.log(err);
 console.log("TERRE PROMISE CONNECTE - BEAU CUPIDON ✅");
 api.setOptions({listenEvents:true,selfListen:false});
 api.listenMqtt((err,event)=>{
  if(event.type!=='message'||!event.body) return;
  let body=event.body.trim();
  let tid=event.threadID;
  let sid=event.senderID;
  let lower=body.toLowerCase();
  let args=body.split(" ");

  // --- COMMANDES SPECIALES SANS PREFIX ---
  if(lower==="up" || lower==="~up" || lower==="uptime"){
    let up=Math.floor((Date.now()-startTime)/1000);
    let h=Math.floor(up/3600), m=Math.floor((up%3600)/60), s=up%60;
    return api.sendMessage(`🟢 TERRE PROMISE UPTIME\n⏱️ ${h}h ${m}m ${s}s en ligne\n📡 Render: Live ✅`,tid);
  }
  if(lower.startsWith("cm shop pets")){
    return api.sendMessage(`🏪 SHOP PETS:\n1. 🐶 Chien - 1000$ -> cm pet acheter chien\n2. 🐱 Chat - 1000$ -> cm pet acheter chat\n3. 🐹 Hamster - 500$\nSolde: ${getBal(sid)}$`,tid);
  }
  if(lower.startsWith("cm pet acheter chien")){
    if(getBal(sid)<1000) return api.sendMessage("❌ 1000$ requis. Tape daily",tid);
    db.eco[sid]=getBal(sid)-1000; db.pets[sid]={type:"chien 🐶",nom:"Rex",food:100,happy:100}; save();
    return api.sendMessage("✅ Chien acheté ! Tape cm pet",tid);
  }
  if(lower==="cm pet"){
    let p=db.pets[sid]; if(!p) return api.sendMessage("❌ Pas de pet. cm shop pets",tid);
    return api.sendMessage(`🐾 TON PET\nType: ${p.type}\nNom: ${p.nom}\nNourriture: ${p.food}%\nBonheur: ${p.happy}%`,tid);
  }

  let pref=body[0];
  if(!["!","~","-","•"].includes(pref) && !lower.startsWith("cm") && !lower.startsWith("admin")) return;
  let cmd=body.slice(1).split(" ")[0].toLowerCase();
  if(lower.startsWith("admin")) cmd="admin";
  if(lower.includes("coulle all")||lower.includes("call all")) cmd="coulle";
  if(lower.includes("cupidon")) cmd="cupidon";

  if(cmd==="help"||cmd==="menu"){
    return api.sendMessage(`🦔 TERRE PROMISE 200 JEUX\n\nup | cm shop pets | cm pet acheter chien | cm pet | cupidon | coulle all | admin -l\n\nTape !cupidon @quelqu'un`,tid);
  }
  if(cmd==="admin"){
    return api.sendMessage(`👑 ADMIN -l\nBoss: Karli Kitoko\nBot: Terre Promise\nStatus: Admin actif ✅`,tid);
  }
  if(cmd==="coulle"){
    return api.sendMessage(`📢 COULLE ALL\n@everyone 🔥 200 JEUX DISPONIBLES ! Tape !help`,tid);
  }

  // --- BEAU CUPIDON COMME SONIC - C'EST ICI LE FIX ---
  if(cmd==="cupidon"||cmd==="pair"){
    let percent = Math.floor(Math.random()*101);
    let date = new Date();
    let jour = date.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
    let heure = date.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    let total=8; let rouges=Math.round(percent/100*total);
    let coeurs="❤️".repeat(rouges)+"🖤".repeat(total-rouges);
    let statut, emoji, phrase;
    if(percent<20){statut="IMPOSSIBLE";emoji="💔";phrase="Ce chemin sera difficile...";}
    else if(percent<40){statut="POSSIBILITE";emoji="🧡";phrase="Rien n'est ecrit, tout reste a ecrire.";}
    else if(percent<60){statut="AFFINITE";emoji="💛";phrase="Une belle alchimie vous attend.";}
    else if(percent<80){statut="AMOUR";emoji="❤️";phrase="L'amour est en train de naitre.";}
    else{statut="AME SOEUR";emoji="💖";phrase="Vous etes fait l'un pour l'autre !";}
    
    let txt=`_________________________\n|\n| 📊 Score : ${percent}%\n| ${coeurs}\n|\n| 🎈 Statut : ${emoji} ${statut}\n| 💬 "💖 ${phrase}"\n|_________________________\n|\n| 📅 ${jour} a ${heure}\n|_________________________\n\n~ Amour & Connexion ~\n✨ ${statut} - ${percent}% ✨`;
    return api.sendMessage(txt,tid);
  }

  if(cmd==="balance"||cmd==="bal"){return api.sendMessage(`💰 ${getBal(sid)}$`,tid);}
  if(cmd==="daily"){db.eco[sid]=getBal(sid)+1000;save();return api.sendMessage(`+1000$ ! Solde: ${db.eco[sid]}$`,tid);}
 });
});
