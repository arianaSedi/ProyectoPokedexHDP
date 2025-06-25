document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-sound]'); // cualquier elemento con data-sound
  if (el) {
    const sonidoUrl = el.getAttribute('data-sound');
    const sonido = new Audio(sonidoUrl);
    sonido.play().catch(err => {
      console.warn("No se pudo reproducir el sonido:", err);
    });
  }
});