var lesBoutons = document.getElementsByClassName("bouton-modifier");

for (var i = 0; i < lesBoutons.length; i++) {
    lesBoutons[i].addEventListener("click", modifierAdresse, false);
}

function modifierAdresse(){
    var lesDonnees = this.parentNode.getElementsByTagName('span');
    console.log(this.dataset.id);
    var data = {
        "_id": this.dataset.id,
        "nom": lesDonnees[0].innerText,
        "prenom": lesDonnees[1].innerText,
        "telephone": lesDonnees[2].innerText,
        "ville": lesDonnees[3].innerText,
        "postal": lesDonnees[4].innerText
    }
    requeteXMLHttpRequest(data);

}

function requeteXMLHttpRequest(data){
    xhr = new XMLHttpRequest();
    xhr.open('POST', "modifier/", true);
    sData = JSON.stringify(data);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(sData);
    xhr.addEventListener("readystatechange", traiterRequest, false);
}


function traiterRequest(e) {
    console.log("xhr.readyState = " + xhr.readyState)
    console.log("xhr.status = " + xhr.status)
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('ajax fonctionne')
        console.log(xhr.responseText);
    }
}
