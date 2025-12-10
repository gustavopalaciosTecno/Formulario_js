let elementoTextoAlarma = document.getElementById("textoAlarma");
let tiempoRestante = 3 * 60; // 3 minutos en segundos (180 segundos)
let intervaloReloj;

function comenzarReloj() {
    // Actualizar inmediatamente
    actualizarTemporizador();
    
    // Iniciar el intervalo
    intervaloReloj = setInterval(tictac, 1000);
}

function tictac() {
    // Reducir un segundo
    tiempoRestante--;
    
    // Actualizar la visualización
    actualizarTemporizador();
    
    // Verificar si el tiempo se acabó
    if (tiempoRestante <= 0) {
        clearInterval(intervaloReloj);
        tiempoAgotado();
    }
}

function actualizarTemporizador() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    
    // Formatear a 2 dígitos
    let textoMinutos = String(minutos).padStart(2, "0");
    let textoSegundos = String(segundos).padStart(2, "0");
    
    // Mostrar el tiempo
    elementoTextoAlarma.textContent = textoMinutos + ":" + textoSegundos;
    
    // Cambiar color cuando quede poco tiempo (opcional)
    if (tiempoRestante <= 30) { // 30 segundos o menos
        elementoTextoAlarma.style.color = "red";
        elementoTextoAlarma.style.fontWeight = "bold";
    }
}

function tiempoAgotado() {
    elementoTextoAlarma.textContent = "00:00";
    elementoTextoAlarma.style.color = "red";
    elementoTextoAlarma.style.fontSize = "3rem";
    
    // Mostrar alerta y enviar formulario automáticamente
    alert("¡Tiempo agotado! Se enviará el formulario automáticamente.");
    
    // Enviar el formulario automáticamente
    document.querySelector("form").submit();
}


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
    let pre6 = document.getElementById("pre6");
    pre6.disabled = false;
    let pre7 = document.getElementById("pre7");
    pre7.disabled = false;
    setTimeout(tiempoAgotado, 1000 * 180);
}


function tiempoAgotado(){
    pre1.disabled = true;
    pre2.disabled = true;
    pre3.disabled = true;
    pre4.disabled = true;
    pre5.disabled = true;
    pre6.disabled = true;
    pre7.disabled = true;
    alert("GAME OVER");
    
}


function enviarRespuestas(){
    alert("Respuestas enviadas...");
    resetearCuestionario();
    
}


function resetearCuestionario(){
    location.reload();
    
}




