// Selecciona todas las imagenes del carrusel
const imagenes = document.querySelectorAll(".imagen");
const total = imagenes.length;

// Separa las imagenes equitativamente en 360 grados
const separacion = 360 / total;
let angulo = 0;

function rotarCarrusel() {
  angulo += 0.3;

  // Si la pantalla es pequena, reduce la profundidad para que no se vean tan separadas
  const anchoPantalla = window.innerWidth;
  const distanciaZ = anchoPantalla < 576 ? 250 : 500;

  imagenes.forEach((img, i) => {
    // Calcula la rotacion y posicion en el eje Z
    const rotacionY = separacion * i + angulo;
    const rad = rotacionY * (Math.PI / 180);
    const z = Math.cos(rad) * distanciaZ;
    const escala = 0.8 + (z / 1000);

    // Aplica transformaciones 3D a la imagen
    img.style.transform = `rotateY(${rotacionY}deg) translateZ(${distanciaZ}px) scale(${escala})`;
    img.style.zIndex = Math.round(z);
    img.style.opacity = 1;
  });

  // Llama nuevamente a la funcion para animar continuamente
  requestAnimationFrame(rotarCarrusel);
}

// Inicia la animacion del carrusel
rotarCarrusel();
