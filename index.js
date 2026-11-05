

let jeux = {};
const blagues = [
"Pourquoi les plongeurs plongent en arrière ? Sinon ils tombent dans le bateau 😂",
"Que dit un escargot à une limace ? Regarde la belle décapotable ! 😂",
"A Kinshasa même le wifi est en embouteillage 😅",
"Que fait une vache qui a mal à la tête ? Elle va voir le meuh-decine ! 😂"
];
const NOMS_JEUX = ["Devinette Mystère","Quiz Bible","Calcul Rapide","Pierre-Papier-Ciseaux","Lancer de Dé","Trouve le Nombre","Vrai ou Faux","Capitale du Monde","Animal Mystère","Chiffre Chance","Mot Caché","Mémoire","Blague Battle","Qui suis-je ?","Enigme Kinshasa","Maths Flash","Histoire Choisie","Chasse au Trésor","Course de Voiture","Combat de Héros","Devinette Animaux","Quiz Foot","Devinette Fruits","Trouve la Couleur","Jeu du Dragon","Jeu du Lion","Jeu du Phoenix","Super Quiz","Jeu des Étoiles","Jeu du Roi","Devinette École","Quiz Musique","Jeu des Lettres","Trouve l'Intrus","Jeu de la Chance","Bataille de Nombres","Jeu du Sorcier","Jeu du Ninja","Jeu du Samouraï","Jeu du Robot","Quiz Congo","Quiz Kinshasa","Jeu du Marché","Jeu du Taxi","Jeu du Footballeur","Jeu du Chanteur","Jeu du Danseur","Jeu du Pêcheur","Jeu du Chasseur","Jeu de la Forêt","Devinette Eau","Devinette Feu","Devinette Terre","Devinette Air","Jeu du Ciel","Jeu de la Lune","Jeu du Soleil","Jeu de la Pluie","Jeu du Tonnerre","Jeu de l'Éclair","Quiz Proverbes","Jeu des Proverbes","Jeu du Sage","Jeu du Chef","Jeu du Capitaine","Jeu du Pilote","Jeu du Docteur","Jeu du Prof","Jeu du Policier","Jeu du Pompier","Jeu du Super-Héros","Jeu du Magicien","Jeu du Pirate","Jeu du Cowboy","Jeu du Astronaute","Jeu du Plongeur","Jeu du Cycliste","Jeu du Boxeur","Jeu du Lutteur","Jeu du Nageur","Jeu du Chocolat","Jeu du Bonbon","Jeu du Gâteau","Jeu du Poulet","Jeu du Poisson","Jeu du Bananier","Jeu du Mangier","Jeu du Riz","Jeu du Fufu","Jeu du Saka-Saka","Jeu Final Terre Promise","Jeu Légende","Jeu Champion","Jeu du Millionnaire","Jeu du Président","Jeu du Roi Karli","Jeu du Phénix Final","Jeu 98 Surprise","Jeu 99 Mystère","Jeu 100 Légendaire"];

function repondre(texte, nom="ami"){
  let t = texte.toLowerCase().trim();

  // MENU
  if(t==="menu"||t==="!menu"||t==="!aide") return "🔥 TERRE PROMISE BOT 🔥\n!jeux = 100 jeux\n!jeu 1 à !jeu 100 = jouer\n!anim = j'anime\n!danse = on danse\n!blague = blague\n!aventure = aventure\n!bonjour = salut";

  // 100 JEUX
  if(t==="!jeux"||t==="!100jeux") return "🔥 100 JEUX TERRE PROMISE 🔥\nTape !jeu + numéro. Ex: !jeu 1, !jeu 50, !jeu 100\n1-20 Devinettes, 21-40 Quiz, 41-60 Calculs, 61-80 Animaux, 81-100 Légende !\nTape !jeu 1 pour commencer !";
  if(t.startsWith("!jeu ")){
    let n = parseInt(t.replace("!jeu","").trim());
    if(isNaN(n)||n<1||n>100) return "Écris !jeu 1 à !jeu 100. Ex: !jeu 5";
    let nomJeu = NOMS_JEUX[n-1];
    if(n<=20) return `🎮 JEU ${n} - ${nomJeu} 🔥\nJe pense à un nombre entre 1 et 10. Devine ! Écris le chiffre !`;
    if(n<=40) return `🎮 JEU ${n} - ${nomJeu} 🔥\nCombien fait 7 + 8 ? Écris ta réponse !`;
    if(n<=60) return `🎮 JEU ${n} - ${nomJeu} 🔥\nVrai ou Faux : Kinshasa est capitale de la RDC ? Écris vrai ou faux !`;
    if(n<=80) return `🎮 JEU ${n} - ${nomJeu} 🔥\nAnimal qui rugit, roi de la forêt. Qui suis-je ?`;
    return `🎮 JEU ${n} - ${nomJeu} 🔥\nTU ES NIVEAU LÉGENDE ! 🏆 Tape !anim !`;
  }
  // ANIMATEUR
  if(t==="!anim"||t.includes("anime")||t.includes("animateur")) return "🔥🔥🔥 ALLEZ TERRE PROMISE ! FAITES DU BRUIT !!! 🔥🔥🔥 Qui est chaud ? Écris MOI !!!";
  if(t==="!danse"||t==="danse") return "💃🕺 ON DANSE ! 💃🕺 Moi : 🕺💃🕺 À toi ! Tape !anim !";
  if(t==="moi"||t==="présent"||t==="present") return `YES ${nom} EST PRÉSENT ! 🔥 +10 points ! Tape !jeu 10 !`;
  if(t==="!score") return `${nom}, ton score 100 points ! Tu es CHAMPION ! 🏆`;

  // AVENTURE
  if(t==="!aventure") return "🔥 AVENTURE : Tu es à Kinshasa, 2 chemins. Gauche vers rivière ou droite vers montagne ? Écris gauche ou droite !";
  if(t==="gauche"||t==="droite"||t==="ouvre"||t==="pars"||t==="cours"||t==="reste") return `WOW tu as choisi ${t} ! +10 points ! 🏆 Tape !aventure !`;

  // JEUX SIMPLES
  if(t==="!blague"||t.includes("blague")) return blagues[Math.floor(Math.random()*blagues.length)] + "\nTape !blague pour une autre 😂";
  if(t==="!dé"||t==="!de") { let d=Math.floor(Math.random()*6)+1; return `🎲 Dé : ${d} ! ${d===6?"WOW 6 ! Tu as gagné ! 🏆":"Rejoue !dé"}`; }
  if(t==="!pierre") return "✊✋✌️ Écris : pierre / papier / ciseaux";
  if(t==="pierre"||t==="papier"||t==="ciseaux"){ let c=["pierre","papier","ciseaux"]; let b=c[Math.floor(Math.random()*3)]; let r=t===b?"Égalité !":((t==="pierre"&&b==="ciseaux")||(t==="papier"&&b==="pierre")||(t==="ciseaux"&&b==="papier"))?"Tu as gagné ! 🏆":"J'ai gagné ! 😎"; return `Moi : ${b} | Toi : ${t}\n${r} Tape !pierre`; }

  // DISCUSSION INTELLIGENTE
  if(t==="cc"||t==="salut"||t==="coucou"||t==="yo"||t==="bonjour"||t==="!bonjour") return `Salut ${nom} ! 🔥 Bienvenue à TERRE PROMISE ! Tu vas bien ? Tape !menu 😎`;
  if(t.includes("ça va")||t.includes("ca va")) return `Ça va super ${nom} ! Et toi ? Tape !menu pour jouer 😊`;
  if(t.includes("malade")||t.includes("triste")||t.includes("fatigu")) return `Courage ${nom} ❤️ Ça va aller. Je prie pour toi. Tape !blague pour te remonter le moral ?`;
  if(t.includes("tu fais quoi")) return `Moi je t'attends pour jouer 😎 Tape !menu !`;
  if(t.includes("terre promise")) return "TERRE PROMISE c'est notre famille ! 🔥 165 membres les meilleurs ! Tape !menu";
  if(t.includes("qui es tu")||t.includes("ton nom")) return "Moi c'est PHOENIX, bot de Terre Promise 🔥 Je joue, je discute, j'anime. Tape !menu";
  if(t.includes("merci")) return `De rien ${nom} 🙏 On est famille ! Tape !jeu 1`;
  if(t.includes("jesus")||t.includes("dieu")||t.includes("priere")) return "Amen 🙏 Dieu est avec Terre Promise. Dis-moi ton sujet de prière.";
  if(t.includes("jeu")||t.includes("jouer")) return "Tu veux jouer ? 🔥 Tape !jeux puis !jeu 1 !";

  return `Je t'ai compris ${nom} : "${texte}" 😊 Je suis PHOENIX. Tape !menu pour les 100 jeux 🔥`;
}

app.get('/', (req,res)=> res.send('TERRE PROMISE BOT PHOENIX - EN LIGNE 🔥'));
app.get('/webhook', (req,res)=>{ if(req.query['hub.verify_token']===VERIFY_TOKEN) return res.send(req.query['hub.challenge']); res.send('Token invalide'); });
app.post('/webhook', async (req,res)=>{
  try{
    if(req.body.object==='whatsapp_business_account'){
      let msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      if(msg && msg.text && WHATSAPP_TOKEN && WHATSAPP_PHONE_ID){
        let rep = repondre(msg.text.body,"ami");
        await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,{method:'POST',headers:{'Authorization':`Bearer ${WHATSAPP_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({messaging_product:'whatsapp',to:msg.from,text:{body:rep}})});
      }
    }
    if(req.body.object==='page'){
      let m = req.body.entry?.[0]?.messaging?.[0];
      if(m && m.message && m.message.text && PAGE_TOKEN){
        let rep = repondre(m.message.text,"ami");
        await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_TOKEN}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({recipient:{id:m.sender.id},message:{text:rep}})});
      }
    }
    res.sendStatus(200);
  }catch(e){ console.log(e); res.sendStatus(200); }
});
app.listen(PORT, ()=> console.log('Bot Terre Promise en ligne sur '+PORT));
