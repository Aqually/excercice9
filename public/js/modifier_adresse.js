xhr = new XMLHttpRequest();
xhr.open('POST', "modifier", true);
data = {
    "modif": {
        "nom": elmLigneDiv[0].innerHTML,
        "prenom": elmLigneDiv[1].innerHTML,
        "telephone": elmLigneDiv[2].innerHTML
    },
    "_id": elmLigneDiv[3].innerHTML
}

sData = JSON.stringify(data);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(sData);
xhr.addEventListener("readystatechange", traiterRequest, false);

function traiterRequest(e) {
    console.log("xhr.readyState = " + xhr.readyState)
    console.log("xhr.status = " + xhr.status)
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('ajax fonctionne')
        var response = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        elmChamp_id.innerHTML = response[0]._id
        elmLigne.style.backgroundColor = "#0f0"
    }
}
