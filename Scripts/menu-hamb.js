document.addEventListener("DOMContentLoaded", () => {
    const menuHamb = document.getElementById("menu-hamb");
    const menu = document.getElementById("menu");

    // Comenzar con el menú oculto
    menu.classList.add("oculto");

    menuHamb.addEventListener("click", () => {
    menu.classList.toggle("oculto");
    });
});