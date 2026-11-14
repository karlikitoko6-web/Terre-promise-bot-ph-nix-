// ... GARDE LE DEBUT DU CODE QUE TU AS DEJA (ws3-fca, http, login) ...
// JE TE DONNE JUSTE LA PARTIE CUPIDON A REMPLACER DANS TON CODE

if(cmd==="cupidon"||cmd==="pair"||cmd==="love"){
    let percent = Math.floor(Math.random()*101);
    let date = new Date();
    let jour = date.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
    let heure = date.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    
    // Coeurs comme sur ta photo
    let totalCoeurs = 8;
    let coeursRouges = Math.round(percent/100*totalCoeurs);
    let coeurs = "❤️".repeat(coeursRouges) + "🖤".repeat(totalCoeurs-coeursRouges);
    
    let statut, emojiStatut, phrase, certificat;
    if(percent < 20){ statut="IMPOSSIBLE"; emojiStatut="💔"; phrase="Ce chemin sera difficile..."; certificat="AUCUN POTENTIEL"; }
    else if(percent < 40){ statut="POSSIBILITE"; emojiStatut="🧡"; phrase="Rien n'est ecrit, tout reste a ecrire."; certificat="CERTIFICAT DE POSSIBILITE"; }
    else if(percent < 60){ statut="AFFINITE"; emojiStatut="💛"; phrase="Une belle amitié vous attend."; certificat="CERTIFICAT D'AFFINITE"; }
    else if(percent < 80){ statut="AMOUR"; emojiStatut="❤️"; phrase="L'amour est en train de naître."; certificat="CERTIFICAT D'AMOUR"; }
    else { statut="AME SOEUR"; emojiStatut="💖"; phrase="Vous êtes fait l'un pour l'autre !"; certificat="CERTIFICAT D'AME SOEUR"; }

    let msg1 = `_________________________\n|\n| 📊 Score : ${percent}%\n| ${coeurs}\n|\n| 📍 Statut : ${emojiStatut}\n| ${statut}\n| 💬 "💖 ${phrase}"\n|_________________________\n|\n| 📅 ${jour}\n| a ${heure}\n| 🧡\n|_________________________\n\n  ~ Amour & Connexion ~\n\n   ${percent}% \n   ✨ ${statut} ✨\n\n"${phrase}"`;

    let msg2 = `_______________________\n-- Declaration Officielle --\n\n${certificat}\n\nReconnait un potentiel entre\nKarli Kitoko & Pascaline Ansima\n\nScore de Compatibilite: ${percent}%\n\n"L'essence de l'image laisse son empreinte"\n_______________________`;

    api.sendMessage(msg1, tid);
    setTimeout(()=>{ api.sendMessage(msg2, tid); }, 1000);
    return;
}
