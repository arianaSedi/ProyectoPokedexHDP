document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const muteBtn = document.getElementById('muteBtn');
    
    // Configuración inicial
    bgMusic.volume = 0.5;
    let isMuted = false;

    // Función para alternar silencio
    function toggleMute() {
        isMuted = !isMuted;
        
        if (isMuted) {
            bgMusic.pause();
            muteBtn.textContent = '🔇';
        } else {
            bgMusic.play().catch(e => console.log("Error al reproducir:", e));
            muteBtn.textContent = '🔊';
        }
    }

    // Manejar el clic en el botón
    muteBtn.addEventListener('click', toggleMute);

    // Intentar reproducir automáticamente al cargar
    bgMusic.play().catch(e => {
        console.log("Autoplay bloqueado:", e);
        muteBtn.textContent = '▶';
    });

    // Reiniciar reproducción si se pausa por políticas del navegador
    bgMusic.addEventListener('pause', function() {
        if (!isMuted && !document.hidden) {
            bgMusic.play().catch(e => console.log("Error al reanudar:", e));
        }
    });
});