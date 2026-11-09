const fs=require('fs');
const express=require('express');
const login=require('ws3-fca');
const app=express();
const PORT=process.env.PORT||10000;
app.get('/',(req,res)=>{
 res.send('OK');
});
app.listen(PORT,'0.0.0.0',()=>{
 console.log('Serveur OK');
});
let raw=fs.readFileSync('appstate.json');
let appState=JSON.parse(raw);
login({appState},(err,api)=>{
 if(err){
  console.log(err);
  return;
 }
 console.log('CONNECTE');
 api.setOptions({
  listenEvents:true,
  selfListen:false
 });
 api.listenMqtt((a,e)=>{
  if(e&&e.body){
   console.log(e.body);
   api.sendMessage(e.body,e.threadID);
  }
 });
});
