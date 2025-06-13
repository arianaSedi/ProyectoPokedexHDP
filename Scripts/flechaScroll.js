const flechaScroll = document.getElementById("flechaScroll");

  // Mostrar el boton cuando se hace scroll hacia abajo
  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      flechaScroll.style.display = "block";
    } else {
      flechaScroll.style.display = "none";
    }
  };

  // Scroll suave hacia arriba al hacer clic
  flechaScroll.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };