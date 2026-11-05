const fs = require('fs');
const express = require('express');
const login = require('ws3-fca');

// Garde Render allumé
const app = express();
app.get('/', (req,res) => res.send('TERRE PROMISE PHENIX BOT CONNECTE 🔥'));
app.listen(process.env.PORT || 10000, () => console.log("Web en ligne"));

// Lis l'appstate
const appState = JSON.parse(fs.readFileSync('./appstate.json','utf8'));

let jeux = {};
const blagues = [
"Pourquoi les plongeurs plongent en arrière ? Parce que sinon ils tombent dans le bateau 😂",
"Que dit un escargot à une limace ? Regarde j'ai une maison !",
"A Kinshasa même le wifi est en embouteillage",
"Que fait une vache qui a mal à la tête ? Elle prend un DoliPRÉ 🐄"
];

const NOMS_JEUX = ["Devinette Mystère","Pierre Papier Ciseaux","Quizz Culture","Vrai ou Faux","Anagramme","Devine l'animal","Devine le pays","Math rapide","Devine l'emoji","Pendu","Labyrinthe","Tic Tac Toe","Snake","Devine l'âge","Blague","Morpion","Memory","Question drole","Qui suis-je","Devine la couleur","Devine la chanson","Devine le film","Devine le footballeur","Capitales","Drapeaux","Enigme","Charade","Riddle","Calcul","Suite logique","Mot caché","Phrase melangée","Devine le mot","Speed typing","Reflexe","Pierre","Bataille","Bombe","Survie","Aventure","Zombie","Chasse","Course","Quiz anime","Quiz Marvel","Quiz DC","Quiz Naruto","Quiz One Piece","Quiz Dragon Ball","Quiz foot","1-100","Lettre par lettre","Alphabet","Chiffre mystère","Devine la date","Devine le poids","Devine la taille","Devine le prix","Dilemme","Choix","Action ou Verite","Jamais","Qui est le plus","Vote","Sondage","Roue","Loterie","Dés","Casino","Jackpot","Poker","Blackjack","Roulette","Mystere","Boite","Coffre","Tresor","Enquete","Detective","Meurtre","Escape","Prison","Police","Voleur","Hacker","Coder","Bug","Code secret","Decryptage","Labo","Science","Espace","Planete","Alien","UFO","Fantome","Magie","Sorcier","Dragon","Phénix","Loup","Terre Promise","Boss","Final","Legende"];

function repondre(texte, nom="ami"){
 let t = texte.toLowerCase().trim();

 // MENU
 if(t==="menu"||t==="help"||t==="~help"||t=="!menu") return `🔥 TERRE PROMISE BØT PHÉNIX 🔥\n\nPréfixe: ! ou ~\n\n!menu - ce menu\n!jeux - liste 100 jeux\n!jeu [1-100] - lance un jeu\ncc / salut - je te réponds\nblague - une blague\nphénix / loup - mode légende\n\nTape !jeux pour commencer !`;

 // 100 JEUX LISTE
 if(t==="jeux"||t==="~jeux"||t=="!jeux"||t=="100jeux"||t=="!100jeux"){
  let liste="🎮 100 JEUX TERRE PROMISE 🎮\n\n";
  NOMS_JEUX.forEach((j,i)=>{ liste+=`${i+1}. ${j}\n`; });
  liste+="\nTape !jeu 12 pour jouer. Ex: !jeu 1";
  return liste;
 }
 if(t.startsWith("!jeu ")||t.startsWith("~jeu ")){
  let n = parseInt(t.replace("!jeu","").replace("~jeu","").trim());
  if(isNaN(n)||n<1||n>100) return "Écris !jeu + numéro entre 1 et 100. Ex: !jeu 5";
  let nomJeu = NOMS_JEUX[n-1];
  if(n===10) return `🎮 JEU ${n} - ${nomJeu}\nJe pense à un mot avec _ _ _ _ . Devine une lettre !`;
  if(n<=20) return `🎮 JEU ${n} - ${nomJeu}\nJe dis un nombre entre 1 et 10, devine ! (réponds juste le chiffre)`;
  return `🎮 JEU ${n} - ${nomJeu} lancé !\nBientôt la suite de ce jeu, pour l'instant tape !jeux pour un autre.`;
 }

 // BLAGUES
 if(t.includes("blague")) return blagues[Math.floor(Math.random()*blagues.length)];

 // DISCUSSION INTELLIGENTE
 if(t==="cc"||t==="salut"||t==="coucou"||t==="~salut") return `Cc ${nom} ! 🔥 C'est Phénix Loup, en ligne seul dans le groupe Terre Promise. Tape !menu`;
 if(t.includes("ça va")||t.includes("ca va")) return `Tranquille ${nom}, et toi ? Prêt à jouer ? Tape !jeux`;
 if(t.includes("tu es qui")||t.includes("qui es tu")) return `Je suis Terre Promise Bøt Phénix 🐺🔥 Un bot intelligent, drôle, avec 100 jeux. Créé pour toi.`;
 if(t.includes("terre promise")) return `Terre Promise c'est notre terre boss, là où le Phénix et le Loup règnent 🔥🐺`;
 if(t.includes("merci")) return `De rien ${nom} 🙏 Toujours là pour toi.`;
 if(t.includes("phénix")||t.includes("phenix")) return `🔥 Phénix Loup s'envole ! Je renais de mes cendres, comme toi boss !`;
 if(t.includes("loup")) return `🐺 Awoooo ! Mode Loup activé ! Terre Promise sous surveillance.`;

 return null;
}

// CONNEXION AU GROUPE
login({appState}, (err, api) => {
  if(err) return console.error("❌ Appstate expiré, refais C3C FBState:", err);
  console.log("✅ TERRE PROMISE CONNECTÉ AU GROUPE !");
  api.setOptions({listenEvents:true, selfListen:false});
  api.listenMqtt((err, event) => {
    if(err || event.type !== "message") return;
    let rep = repondre(event.body || "", "ami");
    if(rep) api.sendMessage(rep, event.threadID);
  });
});
