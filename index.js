const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('TEST OK'));
app.listen(process.env.PORT||10000, ()=>console.log('TEST SERVEUR OK'));
