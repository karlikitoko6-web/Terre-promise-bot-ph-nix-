const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Terre Promise Bot Phoenix est en ligne !');
});

app.post('/webhook', (req, res) => {
  console.log('Message recu :', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log('Bot Terre Promise demarre sur le port ' + PORT);
});
100// ===== 100 JEUX VIDEO + ANIMATEUR TERRE PROMISE =====
const NOMS_JEUX = [
"Devinette Mystère","Quiz Bible","Calcul Rapide","Pierre-Papier-Ciseaux","Lancer de Dé","Trouve le Nombre","Vrai ou Faux","Capitale du Monde","Animal Mystère","Chiffre Chance",
"Mot Caché","Mémoire","Blague Battle","Qui suis-je ?","Enigme Kinshasa","Maths Flash","Histoire Choisie","Chasse au Trésor","Course de Voiture","Combat de Héros",
"Devinette Animaux","Quiz Foot","Devinette Fruits","Trouve la Couleur","Jeu du Dragon","Jeu du Lion","Jeu du Phoenix","Super Quiz","Jeu des Étoiles","Jeu du Roi",
"Devinette École","Quiz Musique","Jeu des Lettres","Trouve l'Intrus","Jeu de la Chance","Bataille de Nombres","Jeu du Sorcier","Jeu du Ninja","Jeu du Samouraï","Jeu du Robot",
"Quiz Congo","Quiz Kinshasa","Jeu du Marché","Jeu du Taxi","Jeu du Footballeur","Jeu du Chanteur","Jeu du Danseur","Jeu du Pêcheur","Jeu du Chasseur","Jeu de la Forêt",
"Devinette Eau","Devinette Feu","Devinette Terre","Devinette Air","Jeu du Ciel","Jeu de la Lune","Jeu du Soleil","Jeu de la Pluie","Jeu du Tonnerre","Jeu de l'Éclair",
"Quiz Proverbes","Jeu des Proverbes","Jeu du Sage","Jeu du Chef","Jeu du Capitaine","Jeu du Pilote","Jeu du Docteur","Jeu du Prof","Jeu du Policier","Jeu du Pompier",
"Jeu du Super-Héros","Jeu du Magicien","Jeu du Pirate","Jeu du Cowboy","Jeu du Astronaute","Jeu du Plongeur","Jeu du Cycliste","Jeu du Boxeur","Jeu du Lutteur","Jeu du Nageur",
"Jeu du Chocolat","Jeu du Bonbon","Jeu du Gâteau","Jeu du Poulet","Jeu du Poisson","Jeu du Bananier","Jeu du Mangier","Jeu du Riz","Jeu du Fufu","Jeu du Saka-Saka",
"Jeu Final Terre Promise","Jeu Légende","Jeu Champion","Jeu du Millionnaire","Jeu du Président","Jeu du Roi Karli","Jeu du Phénix Final","Jeu 98 Surprise","Jeu 99 Mystère","Jeu 100 Légendaire"
];

function lancerJeu(numero, nom) {
  let n = parseInt(numero);
  if (isNaN(n) || n < 1 || n > 100) return `Écris !jeu + numéro. Ex: !jeu 5\nPour voir les 100 jeux, tape !jeux`;
  let nomJeu = NOMS_JEUX[n-1];
  // Jeux simples automatiques par type
  if (n <= 20) return `🎮 JEU ${n} - ${nomJeu} 🔥\nJe pense à un nombre entre 1 et 10. Devine ! Écris juste le chiffre !`;
  if (n <= 40) return `🎮 JEU ${n} - ${nomJeu} 🔥\nQuestion : Combien fait 7 + 8 ? Écris ta réponse !`;
  if (n <= 60) return `🎮 JEU ${n} - ${nomJeu} 🔥\nVrai ou Faux : Kinshasa est la capitale de la RDC ? Écris vrai ou faux !`;
  if (n <= 80) return `🎮 JEU ${n} - ${nomJeu} 🔥\nJe suis un animal qui rugit, roi de la forêt. Qui suis-je ? Écris ta réponse !`;
  return `🎮 JEU ${n} - ${nomJeu} 🔥\nTU ES ARRIVÉ AU NIVEAU LÉGENDE ! 🏆\nÉcris !anim pour que j'anime le groupe !`;
}

if (t === "!jeux" || t === "!100jeux" || t === "100 jeux") {
  let liste = "🔥🔥 100 JEUX TERRE PROMISE 🔥🔥\nTape !jeu + numéro. Ex: !jeu 1, !jeu 50, !jeu 100\n\n";
  for (let i = 0; i < 100; i++) liste += `${i+1}. ${NOMS_JEUX[i]}\n`;
  liste += "\nTape !jeu 1 pour commencer !";
  return liste.slice(0, 1900) + "\n... Tape !jeu 1, !jeu 2... pour jouer !";
}
if (t.startsWith("!jeu ") || t.startsWith("!jeu")) {
  let num = t.replace("!jeu","").trim();
  if (num === "" || num === "x") return "Tape !jeux pour voir les 100 jeux, puis !jeu 1, !jeu 2... !jeu 100";
  return lancerJeu(num, nom);
}
if (t === "!anim" || t.includes("anime") || t.includes("animateur") || t.includes("ambiance")) {
  let anim = [
    "🔥🔥🔥 ALLEZ TERRE PROMISE !!!! FAITES DU BRUIT !!! 🔥🔥🔥 Qui est chaud ici ? Écris MOI !!!",
    "🎤🎤 ANIMATEUR PHOENIX : Tout le monde debout ! On danse ! Tape !danse !",
    "🏆 CHAMPIONS DE TERRE PROMISE ! Vous êtes les meilleurs ! 165 membres les plus forts de Kinshasa ! Qui est le plus fort ? Écris MOI !",
    "🎉🎉 ON S'AMUSE ! Tape !jeu 1 pour jouer, !blague pour rire, !aventure pour l'aventure ! GO GO GO !",
    "🔥 QUI EST LÀ ? Les vrais de Terre Promise, écrivez PRÉSENT ! Je compte les présents !"
  ];
  return anim[Math.floor(Math.random() * anim.length)];
}
if (t === "!danse" || t === "danse") return "💃🕺 ON DANSE ! 💃🕺\nMoi : 🕺💃🕺💃\nÀ toi ! Envoie un emoji de danse ! Tape !anim pour continuer !";
if (t === "moi" || t === "présent" || t === "present") return `YES ${nom} EST PRÉSENT ! 🔥🔥🔥 +10 points pour toi ! Tu es un vrai de Terre Promise ! Tape !jeu 10 pour ton cadeau !`;
if (t === "!score") return `${nom}, ton score est 🔥 100 points ! Tu es un CHAMPION de Terre Promise ! Continue avec !jeu 1 !`;
