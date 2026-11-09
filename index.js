const express=require('express');
const app=express();
const PORT=process.env.PORT||10000;
app.get('/',(req,res)=>{
 res.send('BOT OK - Terre Promise');
});
app.listen(PORT,'0.0.0.0',()=>{
 console.log('Serveur OK sur port '+PORT);
});
console.log('Bot pret, appstate sera lu apres');
try{
 const fs=require('fs');
 if(fs.existsSync('appstate.json')){
  console.log('appstate.json trouve');
 }else{
  console.log('PAS DE appstate.json');
 }
}catch(e){
 console.log('Erreur:'+e.message);
}
