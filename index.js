// TERRE PROMISE BOT - Version propre et officielle
// Ne jamais mettre de appstate.json ici, on utilise les variables Render

const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PAGE_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'terre-promise-123';
const PREFIX = '•';

let balances = {};

// --- Envoyer un message ---
async function sendMessage(senderId, text) {
  try {
    await axios.post(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_TOKEN}`, {
      recipient: { id: senderId },
      message: { text: text }
    });
  } catch (e) {
    console.log('Erreur envoi:', e.response?.data || e.message);
  }
}

// --- Liste des commandes ---
const commands = {
  help: {
    cat: 'INFOS',
    desc: 'Voir toutes les commandes',
    run: () => {
      return `🔮✨ TERRE PROMISE BOT ✨🔮\n\n` +
      `Préfixe : ${PREFIX}\n\n` +
      `ℹ️ INFOS\n•help - Voir ce menu\n•info - Infos du bot\n•uid - Voir ton ID\n•ping - Tester si bot est vivant\n\n` +
      `💰 ECONOMIE\n•balance - Voir ton solde\n•daily - Bonus du jour\n•travail - Gagner des pièces\n\n` +
      `🎮 JEUX\n•quiz - Question quiz\n•guessnumber - Devine le nombre\n•slot - Machine à sous\n\n` +
      `🧰 OUTILS\n•translate - Traduire\n•weather Paris - Météo\n•say Bonjour - Faire répéter le bot\n\n` +
      `Tape ${PREFIX}help <commande> pour le détail`;
    }
  },
  ping: { cat: 'INFOS', desc: 'Tester', run: () => 'Pong ! 🏓 Je suis en ligne, TERRE PROMISE est là.' },
  up: { cat: 'SYSTEME', desc: 'Uptime', run: () => `Bot en ligne ✅\nUptime : ${Math.floor(process.uptime())} secondes` },
  info: { cat: 'INFOS', desc: 'Infos', run: () => 'Je suis TERRE PROMISE BOT 🤖\nCréé pour la Page TERRE PROMISE\nPréfixe : •' },
  uid: { cat: 'INFOS', desc: 'Ton ID', run: (sender) => `Ton ID est : ${sender}` },
  balance: { cat: 'ECONOMIE', desc: 'Solde', run: (sender) => `💰 Ton solde : ${balances[sender] || 0} pièces` },
  daily: { cat: 'ECONOMIE', desc: 'Bonus', run: (sender) => { balances[sender] = (balances[sender] || 0) + 100; return '🎁 Tu as reçu +100 pièces pour aujourd\'hui !'; } },
  travail: { cat: 'ECONOMIE', desc: 'Travailler', run: (sender) => { balances[sender] = (balances[sender] || 0) + 50; return '💼 Tu as travaillé et gagné +50 pièces !'; } },
  quiz: { cat: 'JEUX', desc: 'Quiz', run: () => '❓ Quiz : Quelle est la capitale du Congo ?\nA) Kinshasa\nB) Lubumbashi\nRéponds avec •reponse Kinshasa' },
  slot: { cat: 'JEUX', desc: 'Slots', run: () => { const e = ['🍒','🍋','⭐','💎','🍇']; const r = [e[Math.floor(Math.random()*5)], e[Math.floor(Math.random()*5)], e[Math.floor(Math.random()*5)]]; return `🎰 ${r.join(' | ')} ${r[0]===r[1]&&r[1]===r[2] ? 'GAGNÉ ! 🎉' : 'Perdu, réessaie'}`; } },
  say: { cat: 'TEXTE', desc: 'Répéter', run: (sender, args) => args.join(' ') || 'Tu veux que je dise quoi ?' },
  weather: { cat: 'INFOS', desc: 'Météo', run: (sender, args) => `🌤️ Météo à ${args.join(' ') || 'Kinshasa'} : Ensoleillé, 28°C` },
  translate: { cat: 'OUTILS', desc: 'Traduire', run: (sender, args) => `Traduction de "${args.join(' ')}" : [Mets ici ton texte traduit]` },
};

// --- Webhook pour Facebook ---
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }
  res.send('Erreur de vérification');
});

app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        if (event.message && event.message.text) {
          const sender = event.sender.id;
          const text = event.message.text.trim();
          if (!text.startsWith(PREFIX)) {
            if (text.toLowerCase() === 'cc' || text.toLowerCase() === 'coucou' || text.toLowerCase() === 'bonjour') {
              await sendMessage(sender, 'Cc ! Bienvenue chez TERRE PROMISE ✨\nTape •help pour voir les commandes');
            }
            continue;
          }
          const parts = text.slice(1).split(' ');
          const cmdName = parts[0].toLowerCase();
          const args = parts.slice(1);
          const cmd = commands[cmdName];
          if (cmd) {
            const reply = cmd.run(sender, args);
            await sendMessage(sender, reply);
          } else {
            await sendMessage(sender, `Commande inconnue. Tape ${PREFIX}help`);
          }
        }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get('/', (req, res) => res.send('TERRE PROMISE BOT est en ligne ✅'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Bot lancé sur port ' + PORT));
