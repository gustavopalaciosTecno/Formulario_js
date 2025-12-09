function inciarCuestionario(){
    let pre1 = document.getElementById("pre1");
    pre1.disabled = false;
    let pre2 = document.getElementById("pre2");
    pre2.disabled = false;
    let pre3 = document.getElementById("pre3");
    pre3.disabled = false;
    let pre4 = document.getElementById("pre4");
    pre4.disabled = false;
    let pre5 = document.getElementById("pre5");
    pre5.disabled = false;
    setTimeout(tiempoAgotado, 1000 * 300);
}


function tiempoAgotado(){
    pre1.disabled = true;
    pre2.disabled = true;
    pre3.disabled = true;
    pre4.disabled = true;
    pre5.disabled = true;
    alert("GAME OVER");
    
}


function enviarRespuestas(){
    alert("Respuestas enviadas...");
    resetearCuestionario();
    
}


function resetearCuestionario(){
    location.reload();
    
}




