const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;
const http = require('http');
http.createServer((req,res)=>{res.end('Hedgehog x Terre Promise Live');}).listen(process.env.PORT||10000);
const appstate = JSON.parse(fs.readFileSync('./appstate.json','utf8'));
let db={eco:{},pets:{}}; try{db=JSON.parse(fs.readFileSync('./db.json','utf8'))}catch(e){}
function getBal(id){if(!db.eco[id])db.eco[id]=5000;return db.eco[id]}
function save(){fs.writeFileSync('./db.json',JSON.stringify(db))}
let startTime=Date.now();
let seen=new Set();

login({appState:appstate},(err,api)=>{
 if(err) return console.log(err);
 console.log("HEDGEHOG STYLE CONNECTE ✅");
 api.setOptions({listenEvents:true,selfListen:false});
 api.listenMqtt((err,event)=>{
  if(event.type!=='message'||!event.body) return;
  if(seen.has(event.messageID)) return; seen.add(event.messageID);
  let body=event.body.trim();
  let tid=event.threadID;
  let sid=event.senderID;
  let lower=body.toLowerCase();
  if(!body.startsWith("~") && !body.startsWith("!") && !lower.startsWith("up") && !lower.startsWith("cm") && !lower.startsWith("admin") && !lower.includes("cupidon")) return;

  let cmd = lower.startsWith("~") || lower.startsWith("!") ? body.slice(1).split(" ")[0].toLowerCase() : lower.split(" ")[0];
  if(lower.includes("cupidon")) cmd="cupidon";
  if(lower.includes("coulle")) cmd="coulle";
  if(lower.startsWith("admin")) cmd="admin";
  if(lower.startsWith("up")) cmd="up";

  // --- HELP HEDGEHOG BEAU DESIGN QUE TU VEUX ---
  if(cmd==="help"||cmd==="menu"||cmd==="aide"){
    let now = new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    let helpText = `╭─────────────────────•
│ 🦔 𝐇𝐄𝐃𝐆𝐄𝐇𝐎𝐆 𝐁𝐎𝐓 — 𝐀𝐈𝐃𝐄
├─────────────────────•
│ 🔹 𝐏𝐫𝐞𝐟𝐢𝐱
