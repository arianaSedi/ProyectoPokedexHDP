import setAcompañantes from "./SetAcompañantes.js";

const CardsPokemon = (pokemon) => {
  const main = document.querySelector("main");

  // Eliminar tarjeta previa si existe
  const tarjetaExistente = document.querySelector(".areaTarjeta");
  if (tarjetaExistente) tarjetaExistente.remove();

  // Contenedor principal
  const area = document.createElement("div");
  area.setAttribute("class", "areaTarjeta justify-content-center align-items-center d-flex");
  area.setAttribute("data-area", "");

  const dibujarTarjeta = document.createElement("div");

  // Clase dinámica según color
  const coloresTarjeta = {
    white: "fondoTarjetaBlanco",
    black: "fondoTarjetaNegro",
    gray: "fondoTarjetaGris",
    red: "fondoTarjetaRojo",
    blue: "fondoTarjetaAzul",
    green: "fondoTarjetaVerde",
    brown: "fondoTarjetaMarron",
    yellow: "fondoTarjetaAmarillo",
    pink: "fondoTarjetaRosa",
    purple: "fondoTarjetaMorado",
  };

  const claseFondo = coloresTarjeta[pokemon.color] || "";
  dibujarTarjeta.setAttribute("class", `card tarjeta_principal ${claseFondo} container-fluid margen_top br_infor`);

  // BOTONES
  const botones = document.createElement("div");
  botones.setAttribute("class", "row flex-row align-items-center");

  const area_volver = document.createElement("div");
  area_volver.setAttribute("class", "col flex-column");

  const boton_volver = document.createElement("button");
  boton_volver.setAttribute("class", "justify-content-center align-items-center d-flex mt-1 mx-3 boton_volver");

  const img_volver = document.createElement("img");
  img_volver.setAttribute("src", "/images/atras.png");
  img_volver.setAttribute("class", "img_volver");

  const area_boton_acompañante = document.createElement("div");
  area_boton_acompañante.setAttribute("class", "col d-flex justify-content-end");

  const boton_acompañante = document.createElement("button");
  boton_acompañante.setAttribute("class", "boton_acompañante justify-content-center align-items-center d-flex mt-1 mx-2");

  const img_pokeball = document.createElement("img");
  img_pokeball.setAttribute("src", "/images/pokeball-abierta.png");
  img_pokeball.setAttribute("class", "img_pokeball");

  boton_acompañante.addEventListener("click", () => {
    setAcompañantes(pokemon);
    window.location.reload();
  });

  boton_volver.addEventListener("click", () => {
    const AreaDiv = document.querySelector("[data-area]");
    if (AreaDiv) AreaDiv.remove();
  });

  // NOMBRE E ID
  const area_NombreID = document.createElement("div");
  area_NombreID.setAttribute("class", "row flex-row align-items-center mt-3");

  const area_nombre = document.createElement("div");
  area_nombre.setAttribute("class", "col d-flex flex-wrap");

  const nombre = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);
  const nombre_borde = document.createElement("h3");
  nombre_borde.textContent = nombre;

  const color_borde = {
    white: "borde_blanco",
    black: "borde_negro",
    gray: "borde_gris",
    red: "borde_rojo",
    blue: "borde_azul",
    green: "borde_verde",
    brown: "borde_marron",
    yellow: "borde_amarillo",
    pink: "borde_rosa",
    purple: "borde_morado",
  };

  nombre_borde.setAttribute("class", `${color_borde[pokemon.color]} fuente_nombre ms-2`);

  const color_nombre = document.createElement("h3");
  color_nombre.textContent = nombre;
  color_nombre.setAttribute("class", "fuente_nombre ms-2");

  const area_id = document.createElement("div");
  area_id.setAttribute("class", "col d-flex flex-wrap justify-content-end me-3");

  const id_ = document.createElement("h4");
  id_.setAttribute("class", `color_${pokemon.color} fuente_id d-flex`);

  id_.textContent = pokemon.id.toString().padStart(4, "0");

  // IMAGEN
  const area_imgPokemonFila = document.createElement("div");
  area_imgPokemonFila.setAttribute("class", "row align-items-center d-flex justify-content-start");

  const area_imgPokemonColumna = document.createElement("div");
  area_imgPokemonColumna.setAttribute("class", "col d-flex align-items-center");
  area_imgPokemonColumna.setAttribute("data-image", "");

  const imgPokemon = document.createElement("img");
  imgPokemon.setAttribute("src", pokemon.imagen);
  imgPokemon.setAttribute("alt", pokemon.nombre);
  imgPokemon.setAttribute("class", "imagen_tarjeta d-flex");

  // TIPOS
  const tipos_columna = document.createElement("div");
  tipos_columna.setAttribute("class", "col d-flex justify-content-center align-items-center");

  pokemon.tipos.forEach((tipo) => {
    const decoracion = document.createElement("p");
    decoracion.setAttribute("class", "decoracion_tipos d-flex ms-1 margen_corto");
    decoracion.textContent = "a";

    const tipoTexto = document.createElement("p");
    tipoTexto.setAttribute("class", "fuente_tipos d-flex");
    tipoTexto.textContent = tipo;

    tipos_columna.appendChild(decoracion);
    tipos_columna.appendChild(tipoTexto);
  });

  // INFORMACIÓN
  const informacion_fila = document.createElement("div");
  informacion_fila.setAttribute("class", "row align-items d-flex");

  const InfoDiv = document.createElement("div");
  InfoDiv.setAttribute("class", "card tarjeta_principal br_infor margen_arriba_principal");

  const NavbarOpciones = document.createElement("div");
  NavbarOpciones.setAttribute("class", "d-flex row justify-content-center align-items-center gap-2 flex-wrap");
  //NavbarOpciones.setAttribute("class", "row align-items-center d-flex justify-content-between");

  const botonesNav = [
    { texto: "About", clase: "botonOp active" },
    { texto: "Stats", clase: "botonOp" },
    { texto: "Evolution", clase: "botonOp" },
    { texto: "Moves", clase: "botonOp" },
  ];

  const BotonesInfor = botonesNav.map(({ texto, clase }) => {
    const btn = document.createElement("button");
    btn.setAttribute("class", clase);
    btn.textContent = texto;
    btn.addEventListener("click", () => {
      BotonesInfor.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
    NavbarOpciones.appendChild(btn);
    return btn;
  });

  const containerInfor = document.createElement("div");
  containerInfor.setAttribute("class", "margen_top d-flex flex-column");

  const crearFila = (titulo, valor) => {
    const fila = document.createElement("div");
    fila.setAttribute("class", "row align-items-center d-flex");

    const col1 = document.createElement("div");
    col1.setAttribute("class", "col d-flex justify-content-start col-3 ms-2");

    const texto1 = document.createElement("p");
    texto1.setAttribute("class", "fuente_data");
    texto1.textContent = titulo;

    const col2 = document.createElement("div");
    col2.setAttribute("class", "col d-flex justify-content-start");

    const texto2 = document.createElement("p");
    texto2.setAttribute("class", "fuente_data fw-bold");
    texto2.textContent = valor;

    col1.appendChild(texto1);
    col2.appendChild(texto2);
    fila.appendChild(col1);
    fila.appendChild(col2);

    return fila;
  };

  const alturaM = (pokemon.altura / 100).toFixed(2) + " m";
  const pesoLb = (pokemon.peso * 2.2046).toFixed(2) + " lbs";

  containerInfor.appendChild(crearFila("Data", ""));
  containerInfor.appendChild(crearFila("Especie", pokemon.especie));
  containerInfor.appendChild(crearFila("Altura", `${pokemon.altura} cm (${alturaM})`));
  containerInfor.appendChild(crearFila("Peso", `${pokemon.peso} kg (${pesoLb})`));
  containerInfor.appendChild(crearFila("Habilidades", pokemon.habilidades.join(", ")));
  containerInfor.appendChild(crearFila("Debilidades", pokemon.debilidades.join(", ")));
  containerInfor.appendChild(crearFila("Cría", ""));
  containerInfor.appendChild(crearFila("Grupo Huevo", pokemon.grupos_huevo.join(", ")));

  // Ensamblar todo
  area_nombre.appendChild(nombre_borde);
  area_nombre.appendChild(color_nombre);

  area_id.appendChild(id_);
  area_NombreID.appendChild(area_nombre);
  area_NombreID.appendChild(area_id);

  area_imgPokemonColumna.appendChild(imgPokemon);
  area_imgPokemonFila.appendChild(area_imgPokemonColumna);
  area_imgPokemonFila.appendChild(tipos_columna);

  InfoDiv.appendChild(NavbarOpciones);
  InfoDiv.appendChild(containerInfor);

  informacion_fila.appendChild(InfoDiv);

  area_volver.appendChild(boton_volver).appendChild(img_volver);
  area_boton_acompañante.appendChild(boton_acompañante).appendChild(img_pokeball);

  botones.appendChild(area_volver);
  botones.appendChild(area_boton_acompañante);

  dibujarTarjeta.appendChild(botones);
  dibujarTarjeta.appendChild(area_NombreID);
  dibujarTarjeta.appendChild(area_imgPokemonFila);
  dibujarTarjeta.appendChild(informacion_fila);

  area.appendChild(dibujarTarjeta);
  main.appendChild(area);
};

function conteo(numero) {
  return Math.abs(numero).toString().length;
}

export default CardsPokemon;
