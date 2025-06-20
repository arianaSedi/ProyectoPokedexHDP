const imagenes = document.querySelectorAll(".imagen");
    const total = imagenes.length;
    const separacion = 360 / total;
    let angulo = 0;

    function rotarCarrusel() {
      angulo += 0.3;
      imagenes.forEach((img, i) => {
        const rotacionY = separacion * i + angulo;
        const rad = rotacionY * (Math.PI / 180);
        const z = Math.cos(rad) * 500;
        const escala = 0.8 + (z / 1000);
        img.style.transform = `rotateY(${rotacionY}deg) translateZ(500px) scale(${escala})`;
        img.style.zIndex = Math.round(z);
        img.style.opacity = 1;
      });
      requestAnimationFrame(rotarCarrusel);
    }
    rotarCarrusel();