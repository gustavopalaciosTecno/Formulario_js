class TemporizadorCuestionario {
    constructor() {
        this.elementoTemporizador = document.getElementById("textoAlarma");
        this.tiempoTotal = 3 * 60; // 3 minutos en segundos
        this.tiempoRestante = this.tiempoTotal;
        this.intervalo = null;
        this.cuestionarioIniciado = false;
        this.preguntas = [];
        this.inicializar();
    }

    inicializar() {
        this.cargarPreguntas();
        this.actualizarDisplay();
        this.configurarEventListeners();
    }

    cargarPreguntas() {
        // Obtener todas las preguntas por su ID
        const idsPreguntas = ['pre1', 'pre2', 'pre3', 'pre4', 'pre5', 'pre6', 'pre7'];
        this.preguntas = idsPreguntas.map(id => document.getElementById(id));
    }

    configurarEventListeners() {
        const btnIniciar = document.getElementById('btnIniciar');
        const btnEnviar = document.getElementById('btnEnviar');
        
        if (btnIniciar) {
            btnIniciar.addEventListener('click', () => this.iniciarCuestionario());
        }
        
        if (btnEnviar) {
            btnEnviar.addEventListener('click', (e) => {
                e.preventDefault();
                this.enviarRespuestas();
            });
        }
    }

    iniciarCuestionario() {
        if (this.cuestionarioIniciado) return;
        
        this.cuestionarioIniciado = true;
        this.habilitarPreguntas(true);
        this.iniciarTemporizador();
        this.mostrarMensaje("¡Cuestionario iniciado! Tienes 3 minutos.", "info");
    }

    habilitarPreguntas(habilitar) {
        this.preguntas.forEach(pregunta => {
            if (pregunta) {
                pregunta.disabled = !habilitar;
                pregunta.style.opacity = habilitar ? "1" : "0.6";
            }
        });
    }

    iniciarTemporizador() {
        this.actualizarDisplay();
        this.intervalo = setInterval(() => this.actualizarTiempo(), 1000);
    }

    actualizarTiempo() {
        if (this.tiempoRestante <= 0) {
            this.detenerTemporizador();
            this.tiempoAgotado();
            return;
        }

        this.tiempoRestante--;
        this.actualizarDisplay();
        
        // Cambiar estilos según tiempo restante
        this.actualizarEstilosTemporizador();
    }

    actualizarDisplay() {
        const minutos = Math.floor(this.tiempoRestante / 60);
        const segundos = this.tiempoRestante % 60;
        
        const tiempoFormateado = 
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        
        this.elementoTemporizador.textContent = tiempoFormateado;
        this.elementoTemporizador.setAttribute('aria-live', 'polite');
    }

    actualizarEstilosTemporizador() {
        // Resetear estilos
        this.elementoTemporizador.style.color = "";
        this.elementoTemporizador.style.fontWeight = "";
        this.elementoTemporizador.classList.remove('alerta-media', 'alerta-critica');
        
        // Aplicar estilos según tiempo restante
        if (this.tiempoRestante <= 30 && this.tiempoRestante > 10) {
            this.elementoTemporizador.style.color = "orange";
            this.elementoTemporizador.classList.add('alerta-media');
        } else if (this.tiempoRestante <= 10) {
            this.elementoTemporizador.style.color = "red";
            this.elementoTemporizador.style.fontWeight = "bold";
            this.elementoTemporizador.classList.add('alerta-critica');
        }
    }

    detenerTemporizador() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }

    tiempoAgotado() {
        this.elementoTemporizador.textContent = "00:00";
        this.elementoTemporizador.classList.add('tiempo-agotado');
        
        this.habilitarPreguntas(false);
        this.mostrarMensaje("¡TIEMPO AGOTADO! Se enviarán las respuestas automáticamente.", "error");
        
        // Pequeña pausa antes de enviar
        setTimeout(() => {
            this.enviarRespuestas();
        }, 2000);
    }

    enviarRespuestas() {
        if (!this.validarRespuestasCompletas()) {
            const confirmar = confirm("No has respondido todas las preguntas. ¿Deseas enviar de todas formas?");
            if (!confirmar) return;
        }
        
        this.mostrarMensaje("Enviando respuestas...", "success");
        this.detenerTemporizador();
        
        // Simular envío con feedback visual
        this.mostrarAnimacionEnvio();
        
        setTimeout(() => {
            alert("¡Respuestas enviadas con éxito!");
            this.resetearCuestionario();
        }, 1500);
    }

    validarRespuestasCompletas() {
        return this.preguntas.every(pregunta => {
            if (!pregunta) return true;
            
            if (pregunta.type === 'radio' || pregunta.type === 'checkbox') {
                // Para grupos de radio/checkbox
                const name = pregunta.name;
                const grupo = document.querySelectorAll(`input[name="${name}"]:checked`);
                return grupo.length > 0;
            } else {
                // Para inputs de texto, textarea, select
                return pregunta.value.trim() !== '';
            }
        });
    }

    mostrarAnimacionEnvio() {
        const formulario = document.querySelector('form');
        if (formulario) {
            formulario.style.opacity = '0.7';
            formulario.style.transition = 'opacity 0.5s';
            
            setTimeout(() => {
                formulario.style.opacity = '1';
            }, 1500);
        }
    }

    mostrarMensaje(texto, tipo = "info") {
        // Eliminar mensajes previos
        const mensajesPrevios = document.querySelectorAll('.mensaje-temporal');
        mensajesPrevios.forEach(msg => msg.remove());
        
        // Crear nuevo mensaje
        const mensaje = document.createElement('div');
        mensaje.textContent = texto;
        mensaje.className = `mensaje-temporal mensaje-${tipo}`;
        
        // Estilos básicos
        mensaje.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInOut 3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        // Colores según tipo
        const colores = {
            info: '#3498db',
            success: '#2ecc71',
            error: '#e74c3c',
            warning: '#f39c12'
        };
        
        mensaje.style.backgroundColor = colores[tipo] || colores.info;
        
        document.body.appendChild(mensaje);
        
        // Auto-eliminar después de 3 segundos
        setTimeout(() => {
            if (mensaje.parentNode) {
                mensaje.remove();
            }
        }, 3000);
    }

    resetearCuestionario() {
        this.detenerTemporizador();
        this.tiempoRestante = this.tiempoTotal;
        this.cuestionarioIniciado = false;
        
        // Resetear preguntas
        this.habilitarPreguntas(false);
        this.resetearFormulario();
        
        // Resetear display
        this.actualizarDisplay();
        this.elementoTemporizador.classList.remove('tiempo-agotado', 'alerta-media', 'alerta-critica');
        this.elementoTemporizador.style.cssText = "";
        
        this.mostrarMensaje("Cuestionario reiniciado. Presiona 'Iniciar' para comenzar.", "info");
    }

    resetearFormulario() {
        const formulario = document.querySelector('form');
        if (formulario) {
            formulario.reset();
        }
        
        // Resetear estilos de preguntas
        this.preguntas.forEach(pregunta => {
            if (pregunta) {
                pregunta.style.opacity = "1";
            }
        });
    }
}

// CSS para incluir en tu archivo
const estilosTemporizador = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-20px); }
        15% { opacity: 1; transform: translateY(0); }
        85% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .alerta-media {
        animation: pulse 1s infinite;
    }
    
    .alerta-critica {
        animation: pulse 0.5s infinite;
    }
    
    .tiempo-agotado {
        font-size: 3rem !important;
        text-shadow: 0 0 10px rgba(255,0,0,0.5);
    }
    
    .mensaje-temporal {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Agregar estilos dinámicamente
    const styleSheet = document.createElement('style');
    styleSheet.textContent = estilosTemporizador;
    document.head.appendChild(styleSheet);
    
    // Crear instancia del temporizador
    window.cuestionario = new TemporizadorCuestionario();
});