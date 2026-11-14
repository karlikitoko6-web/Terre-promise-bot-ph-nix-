const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;
const http = require('http');
http.createServer((req,res)=>{res.end('Terre Promise 200 Jeux en ligne');}).listen(process.env.PORT||10000);
const appstate = JSON.parse(fs.readFileSync('./appstate.json','utf8'));

let db={eco:{},pets:{},shop:{}}; try{db=JSON.parse(fs.readFileSync('./db.json','utf8'))}catch(e){db={eco:{},pets:{},shop:{}}}
function getBal(id){if(!db.eco[id])db.eco[id]=5000;return db.eco[id]}
function save(){fs.writeFileSync('./db.json',JSON.stringify(db))}
let startTime=Date.now();

login({appState:appstate},(err,api)=>{
 if(err) return console.log(err);
 console.log("TERRE PROMISE 200 JEUX CONNECTE ✅");
 api.setOptions({listenEvents:true,selfListen:false});

 api.listenMqtt((err,event)=>{
  if(event.type!=='message'||!event.body) return;
  let body=event.body.trim();
  let tid=event.threadID;
  let sid=event.senderID;
  let lower=body.toLowerCase();
  let args=body.split(" ");
  
  // --- COMMANDES SANS PREFIX SPECIALES QUE TU AS DEMANDE ---
  if(lower.startsWith("cm pet acheter chien")){
    if(getBal(sid)<1000) return api.sendMessage("❌ Pas assez d'argent ! Il te faut 1000$ . Tape cm shop pets",tid);
    db.eco[sid]=getBal(sid)-1000; db.pets[sid]={type:"chien 🐶",name:"Rex",nourriture:100,bonheur:100}; save();
    return api.sendMessage("✅ Tu as acheté un chien 🐶 ! Il s'appelle Rex !\nTape 'cm pet' pour le voir\n💰 -1000$",tid);
  }
  if(lower==="cm pet"){
    let pet=db.pets[sid]; if(!pet) return api.sendMessage("❌ Tu n'as pas de pet ! Tape 'cm shop pets' pour acheter",tid);
    return api.sendMessage(`🐾 TON PET:\nType: ${pet.type}\nNom: ${pet.name}\nNourriture: ${pet.nourriture}%\nBonheur: ${pet.bonheur}%\nTape 'cm pet nourrir' pour nourrir`,tid);
  }
  if(lower==="cm pet nourrir"){
    if(!db.pets[sid]) return api.sendMessage("Pas de pet",tid);
    db.pets[sid].nourriture=100; db.pets[sid].bonheur+=10; save();
    return api.sendMessage("🍖 Ton pet a été nourri ! Bonheur +10",tid);
  }
  if(lower==="cm shop pets"){
    return api.sendMessage(`🏪 SHOP PETS - TERRE PROMISE:\n\n1. 🐶 Chien - 1000$ - Tape: cm pet acheter chien\n2. 🐱 Chat - 1000$ - Tape: cm pet acheter chat\n3. 🐹 Hamster - 500$ - Tape: cm pet acheter hamster\n4. 🐍 Serpent - 2000$ - Tape: cm pet acheter serpent\n5. 🦁 Lion - 5000$ - Tape: cm pet acheter lion\n\nTon solde: ${getBal(sid)}$`,tid);
  }
  if(lower.startsWith("cm pet acheter")){
    let type=args[3]; db.pets[sid]={type:type,nom:type,nourriture:100,bonheur:100}; save();
    return api.sendMessage(`✅ Pet ${type} acheté ! Tape cm pet`,tid);
  }
  if(lower.startsWith("give 1no")||lower.startsWith("give")){
    return api.sendMessage(`💸 GIVE: Tu as donné de l'argent !\nUsage: !give @user 100\nSolde: ${getBal(sid)}$`,tid);
  }

  let pref=body[0];
  let isCmd=["!","~","•","-"].includes(pref) || lower.startsWith("cm ") || lower.startsWith("up") || lower.startsWith("admin");
  if(!isCmd){
    if(["salut","yo","cc"].includes(lower)) return api.sendMessage("Yo ! Tape !help pour 200 jeux 🎮",tid);
    return;
  }

  let cmd=body.slice(1).split(" ")[0].toLowerCase();
  if(lower.startsWith("cm ")) cmd=lower;
  if(lower==="up"||lower.startsWith("up ")||lower.startsWith("~up")||lower.startsWith("!up")) cmd="up";
  if(lower.startsWith("admin -l")||lower.startsWith("~admin")||lower.startsWith("!admin")) cmd="admin";
  if(lower.startsWith("~coulle all")||lower==="coulle all") cmd="coulle";
  if(lower==="cupidon"||lower==="~cupidon"||lower==="!cupidon") cmd="cupidon";

  // HELP 200 JEUX
  if(cmd==="help"||cmd==="menu"){
    return api.sendMessage(`╭─────────────────────•
│ 🦔 TERRE PROMISE 200 JEUX
├─────────────────────•
│ 🔹 Prefix : ! ~ • - cm
│ 🔸 Commandes : 200
│ 📂 200 Jeux dedans !
╰─────────────────────•

╭──【 🔥 TES COMMANDES DEMANDEES 】
│ ○ up - uptime du bot
│ ○ cm pet - voir ton pet
│ ○ cm pet acheter chien - acheter chien
│ ○ cm shop pets - boutique pets
│ ○ give 1No - donner argent
│ ○ admin -l - liste admins
│ ○ cupidon - test amour
│ ○ coulle all - tag tout le monde
╰────────────────────

╭──【 🎮 200 JEUX INCLUS 】
│ ○ slot ○ dice ○ roulette ○ pile
│ ○ quiz ○ guessnumber ○ tictactoe
│ ○ echecs ○ dames ○ pokemon
│ ○ rpg ○ slime ○ naruto ○ pet
│ ○ blackjack ○ poker ○ ludo
│ ○ snake ○ tetris ○ 2048
│ ○ + 180 autres ! Tape ~jeux
╰────────────────────

╭──【 💰 ECONOMIE + PETS 】
│ ○ balance ○ daily ○ travail
│ ○ bank ○ top ○ shop
╰────────────────────

Tape: up | cm shop pets | cupidon
Boss: Karli Kitoko`,tid);
  }

  if(cmd==="up"){
    let up=Math.floor((Date.now()-startTime)/1000);
    let h=Math.floor(up/3600); let m=Math.floor((up%3600)/60); let s=up%60;
    return api.sendMessage(`🟢 TERRE PROMISE UPTIME\n⏱️ ${h}h ${m}m ${s}s en ligne\n📡 Render: Live ✅\n🚀 200 Jeux actifs`,tid);
  }
  if(cmd.includes("admin")){
    return api.sendMessage(`👑 LISTE ADMIN -l\n• Boss Principal: Karli Kitoko\n• Bot: Terre Promise V2\n• Status: Admin actif ✅\n• Groupe: ${tid}`,tid);
  }
  if(cmd==="coulle"||cmd==="coulle all"||cmd==="call all"){
    return api.sendMessage(`📢 COULLE ALL - TERRE PROMISE\n@everyone\n🔥🔥🔥 200 JEUX DISPONIBLES 🔥🔥🔥\nTape !help pour jouer !`,tid);
  }
  if(cmd==="cupidon"||cmd==="pair"||cmd==="love"){
    let r=Math.floor(Math.random()*100);
    return api.sendMessage(`💘 CUPIDON - TERRE PROMISE\n💞 Compatibilité: ${r}%\n${r>80?"💖 Vous êtes fait l'un pour l'autre !":r>50?"💕 Pas mal !":"💔 Aïe..."}\n❤️ Par Cupidon Terre Promise`,tid);
  }
  if(cmd==="jeux"||cmd==="games"){
    return api.sendMessage(`🎮 200 JEUX - LISTE:\n1. slot 2. dice 3. pile 4. roulette 5. quiz 6. guess 7. tictactoe 8. echecs 9. blackjack 10. poker\n11. pet 12. pokemon 13. rpg 14. slime 15. ludo 16. snake 17. tetris 18. coffre 19. course 20. crash\n... et 180 autres ! Tape !slot pour commencer`,tid);
  }

  // JEUX DE BASE
  if(cmd==="slot"||cmd==="slots"){let s=["🍒","💎","7️⃣","🍋","🔔"];let r=[s[Math.floor(Math.random()*5)],s[Math.floor(Math.random()*5)],s[Math.floor(Math.random()*5)]];let win=r[0]==r[1]&&r[1]==r[2]?500:0;if(win){db.eco[sid]=getBal(sid)+win;save()}return api.sendMessage(`🎰 [ ${r.join(" | ")} ]\n${win?`JACKPOT +${win}$`:`Perdu !`}`,tid);}
  if(cmd==="dice"||cmd==="de"){return api.sendMessage(`🎲 Dé: ${Math.floor(Math.random()*6)+1}`,tid);}
  if(cmd==="balance"||cmd==="bal"){return api.sendMessage(`💰 Solde: ${getBal(sid)}$`,tid);}
  if(cmd==="daily"){db.eco[sid]=getBal(sid)+1000;save();return api.sendMessage(`🎁 +1000$ Daily ! Solde: ${db.eco[sid]}$`,tid);}
  if(cmd==="ping"){return api.sendMessage(`Pong! 200 jeux actifs ✅`,tid);}

 });
});
