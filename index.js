const fs = require('fs');
const ws3 = require('ws3-fca');
const login = ws3.default || ws3.login || ws3;
const http = require('http');
http.createServer((req,res)=>{res.end('Terre Promise Hedgehog Live');}).listen(process.env.PORT||10000);
const appstate = JSON.parse(fs.readFileSync('./appstate.json','utf8'));
let db={eco:{},pets:{}}; try{db=JSON.parse(fs.readFileSync('./db.json','utf8'))}catch(e){}
function getBal(id){if(!db.eco[id])db.eco[id]=5000;return db.eco[id]}
function save(){fs.writeFileSync('./db.json',JSON.stringify(db))}
let startTime=Date.now();
let seen=new Set();

login({appState:appstate},(err,api)=>{
 if(err) return console.log(err);
 console.log("HEDGEHOG TERRE PROMISE CONNECTE ✅");
 api.setOptions({listenEvents:true,selfListen:false});
 api.listenMqtt((err,event)=>{
  if(event.type!=='message'||!event.body) return;
  if(seen.has(event.messageID)) return; seen.add(event.messageID);
  let body=event.body.trim();
  let tid=event.threadID;
  let lower=body.toLowerCase();
  if(!["~","!"].includes(body[0]) && !lower.startsWith("up") && !lower.startsWith("cm") && !lower.includes("cupidon")) return;
  
  let cmd = body.slice(1).split(" ")[0].toLowerCase();
  if(lower.includes("cupidon")) cmd="cupidon";
  if(lower.startsWith("up")) cmd="uptime";

  if(cmd==="help"||cmd==="menu"){
    let t = new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    let help = `╭─────────────────────•
│ 🦔 𝐇𝐄𝐃𝐆𝐄𝐇𝐎𝐆 𝐁𝐎𝐓 — 𝐀𝐈𝐃𝐄
├─────────────────────•
│ 🔹 𝐏𝐫𝐞𝐟𝐢𝐱 : ~
│ 🔸 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 : 𝟖𝟔
│ 📂 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞𝐬: 𝟐𝟐
│ 🕐 ${t}
╰─────────────────────•

╭──【 ℹ️ 𝐈𝐍𝐅𝐎 — 𝟔 𝐜𝐦𝐝(𝐬) 】
│ ○ 𝐠𝐫𝐨𝐮𝐩𝐭𝐚𝐠   ○ 𝐡𝐞𝐥𝐩
│ 🔒 𝐬𝐞𝐭𝐫𝐨𝐥𝐞   ○ 𝐭𝐞𝐱𝐭𝐭𝐨𝐢𝐦𝐚𝐠𝐞
│ ○ 𝐭𝐢𝐝   ○ 𝐮𝐢𝐝
╰────────────────────

╭──【 🖥️ 𝐒𝐘𝐒𝐓𝐄𝐌 — 𝟏 𝐜𝐦𝐝(𝐬) 】
│ ○ 𝐮𝐩𝐭𝐢𝐦𝐞
╰────────────────────

╭──【 ⚙️ 𝐀𝐃𝐌𝐈𝐍 — 𝟏 𝐜𝐦𝐝(𝐬) 】
│ ○ 𝐦𝐨𝐧𝐞𝐲𝐫𝐞𝐬𝐞𝐭
╰────────────────────

╭──【 👑 𝐎𝐖𝐍𝐄𝐑 — 𝟒 𝐜𝐦𝐝(𝐬) 】
│ ○ 𝐡𝐮𝐛𝐛𝐥𝐞   ○ 𝐬𝐞𝐭𝐥𝐚𝐧𝐠
│ ○ 𝐬𝐞𝐭𝐫𝐚𝐧𝐤𝐮𝐩   ○ 𝐭𝐡𝐫𝐞𝐚𝐝
╰────────────────────

╭──【 🤖 𝐀𝐈 — 𝟒 𝐜𝐦𝐝(𝐬) 】
│ ○ 𝐠𝐞𝐦   ○ 𝐠𝐞𝐧𝐱
│ ○ 𝐩𝐫𝐨𝐦𝐩𝐭   ○ 𝐬𝐨𝐧𝐢𝐜
╰────────────────────

╭──【 📦 𝐁𝐎𝐗 𝐂𝐇𝐀𝐓 — 𝟐𝟏 𝐜𝐦𝐝(𝐬) 】
│ 🔒 𝐚𝐝𝐝𝐮𝐬𝐞𝐫   🔒 𝐚𝐥𝐥
│ ○ 𝐚𝐧𝐭𝐢𝐜𝐡𝐚𝐧𝐠𝐞𝐢𝐧𝐟𝐨𝐛𝐨𝐱   🔒 𝐚𝐮𝐭𝐨𝐬𝐞𝐭𝐧𝐚𝐦𝐞
│ 🔒 𝐛𝐚𝐝𝐰𝐨𝐫𝐝𝐬   🔒 𝐛𝐚𝐧
│ ○ 𝐛𝐮𝐬𝐲   ○ 𝐜𝐨𝐮𝐧𝐭
│ 🔒 𝐟𝐢𝐥𝐭𝐞𝐫𝐮𝐬𝐞𝐫   ○ 𝐠𝐩𝐭
│ ○ 𝐡𝐞𝐝𝐠𝐞𝐡𝐨𝐠𝐬𝐭𝐨𝐫𝐞   🔒 𝐤𝐢𝐜𝐤
│ 🔒 𝐨𝐧𝐥𝐲𝐚𝐝𝐦𝐢𝐧𝐛𝐨𝐱   ○ 𝐫𝐞𝐟𝐫𝐞𝐬𝐡
│ ○ 𝐫𝐮𝐥𝐞𝐬   ○ 𝐬𝐞𝐧𝐝𝐧𝐨𝐭𝐢
│ ○ 𝐬𝐞𝐭𝐧𝐚𝐦𝐞   ○ 𝐬𝐨𝐧𝐢𝐜𝐠𝐜
│ ○ 𝐭𝐚𝐠   ○ 𝐮𝐧𝐬𝐞𝐧𝐝
│ ○ 𝐰𝐚𝐫𝐧
╰────────────────────

╭──【 💰 𝐄𝐂𝐎𝐍𝐎𝐌𝐘 — 𝟓 𝐜𝐦𝐝(𝐬) 】
│ ○ 𝐛𝐚𝐥𝐚𝐧𝐜𝐞   ○ 𝐛𝐚𝐧𝐤
│ ○ 𝐠𝐢𝐯𝐞   ○ 𝐬𝐟𝐱
│ ○ 𝐭𝐨𝐩
╰────────────────────

╭──【 🎉 𝐅𝐔𝐍 — 𝟖 𝐜𝐦𝐝(𝐬) 】
│ ○ 
