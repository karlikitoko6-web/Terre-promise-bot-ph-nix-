const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;
const http = require('http');
http.createServer((req,res)=>{res.end('Terre Promise Live');}).listen(process.env.PORT||10000);
const appstate = JSON.parse(fs.readFileSync('./appstate.json','utf8'));
let db={eco:{},pets:{}}; try{db=JSON.parse(fs.readFileSync('./db.json','utf8'))}catch(e){db={eco:{},pets:{}}}
function getBal(id){if(!db.eco[id])db.eco[id]=5000;return db.eco[id]}
function save(){fs.writeFileSync('./db.json',JSON.stringify(db))}
let startTime=Date.now();
let seen = new Set();

login({appState:appstate},(err,api)=>{
 if(err) return console.log(err);
 console.log("TERRE PROMISE FIX SPAM ✅");
 api.setOptions({listenEvents:true,selfListen:false});
 api.listenMqtt((err,event)=>{
  if(event.type!=='message'||!event.body) return;
  if(seen.has(event.messageID)) return; seen.add(event.messageID); // ANTI-SPAM x2
  if(seen.size>100) seen.clear();
  
  let body=event.body.trim();
  let tid=event.threadID;
  let sid=event.senderID;
  let lower=body.toLowerCase();

  // COMMANDES SANS PREFIX
  if(lower==="up"||lower==="~up"){
    let up=Math.floor((Date.now()-startTime)/1000);
    let h=Math.floor(up/3600), m=Math.floor((up%3600)/60), s=up%60;
    return api.sendMessage(`🟢 UPTIME TERRE PROMISE\n⏱️ ${h}h ${m}m ${s}s\n📡 Live ✅`,tid);
  }
  if(lower.startsWith("cm shop pets")){
    return api.sendMessage(`🏪 SHOP PETS\n🐶 Chien - 1000$\nTape: cm pet acheter chien\nSolde: ${getBal(sid)}$`,tid);
  }
  if(lower.startsWith("cm pet acheter chien")){
    if(getBal(sid)<1000) return api.sendMessage("❌ 1000$ requis",tid);
    db.eco[sid]=getBal(sid)-1000; db.pets[sid]={type:"chien 🐶",nom:"Rex"}; save();
    return api.sendMessage("✅ Chien acheté ! Tape: cm pet",tid);
  }
  if(lower==="cm pet"){
    let p=db.pets[sid]; if(!p) return api.sendMessage("Pas de pet",tid);
    return api.sendMessage(`🐾 TON PET\n${p.type} ${p.nom}`,tid);
  }

  if(!["!","~","-","•"].includes(body[0]) && !lower.startsWith("admin") && !lower.includes("coulle") && !lower.includes("cupidon")) return;
  
  let cmd=body.slice(1).split(" ")[0].toLowerCase();
  if(lower.startsWith("admin")) cmd="admin";
  if(lower.includes("coulle")) cmd="coulle";
  if(lower.includes("cupidon")) cmd="cupidon";

  if(cmd==="help"||cmd==="menu"){
    return api.sendMessage(`🦔 TERRE PROMISE 200 JEUX\n\n• up\n• cm shop pets\n• cm pet acheter chien\n• cm pet\n• !cupidon\n• ~coulle all\n• admin -l\n\nTape !cupidon pour tester`,tid);
  }
  if(cmd==="admin"){
    return api.sendMessage(`👑 ADMIN -l\nBoss: Karli Kitoko`,tid);
  }
  if(cmd==="coulle"){
    return api.sendMessage(`📢 COULLE ALL @everyone 🔥`,tid);
  }

  // BEAU CUPIDON FIX - NE COUPE PLUS
  if(cmd==="cupidon"){
    let percent = Math.floor(Math.random()*101);
    let date = new Date();
    let jour = date.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
    let heure = date.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    let total=8, rouges=Math.round(percent/100*total);
    let coeurs="❤️".repeat(rouges)+"🖤".repeat(total-rouges);
    let statut, emoji, phrase;
    if(percent<20){statut="IMPOSSIBLE";emoji="💔";phrase="Ce chemin sera difficile...";}
    else if(percent<40){statut="POSSIBILITE";emoji="🧡";phrase="Rien n'est ecrit, tout reste a ecrire.";}
    else if(percent<60){statut="AFFINITE";emoji="💛";phrase="Une belle alchimie vous attend.";}
    else if(percent<80){statut="AMOUR";emoji="❤️";phrase="L'amour est en train de naitre.";}
    else{statut="AME SOEUR";emoji="💖";phrase="Vous etes fait l'un pour l'autre !";}
    
    let txt=`💘 CUPIDON - TERRE PROMISE 💘\n\n📊 Score : ${percent}%\n${coeurs}\n\n🎈 Statut : ${emoji} ${statut}\n💬 "${phrase}"\n\n📅 ${jour} à ${heure}\n✨ ${statut} - ${percent}% ✨`;
    return api.sendMessage(txt,tid);
  }
 });
});
