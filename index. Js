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
