import setAcompañantes from "./SetAcompañantes.js";

const CardsPokemon = (pokemon) => {
  const main = document.querySelector("main");

  const area = document.createElement("div");
  area.setAttribute(
    "class",
    "areaTarjeta justify-content-center items-align-center d-flex"
  );
  area.setAttribute("data-area", "");

  const dibujarTarjeta = document.createElement("div");

  switch (pokemon.color) {
    case "white":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaBlanco container-fluid margen_top br_infor"
      );
      break;
    case "black":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaNegro container-fluid margen_top br_infor"
      );
      break;
    case "gray":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaGris container-fluid margen_top br_infor"
      );
      break;
    case "red":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaRojo container-fluid margen_top br_infor"
      );
      break;
    case "blue":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaAzul container-fluid margen_top br_infor"
      );
      break;
    case "green":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaVerde container-fluid margen_top br_infor"
      );
      break;
    case "brown":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaMarron container-fluid margen_top br_infor"
      );
      break;
    case "yellow":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaAmarillo container-fluid margen_top br_infor"
      );
      break;
    case "pink":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaRosa container-fluid margen_top br_infor"
      );
      break;
    case "purple":
      dibujarTarjeta.setAttribute(
        "class",
        "card tarjeta_principal fondoTarjetaMorado container-fluid margen_top br_infor"
      );
      break;
    default:
      break;
  }

  //en este espacio irán los botones de acompañante y de volver atras
  const botones = document.createElement("div");
  botones.setAttribute("class", "row flex-row aling-items-center");

  const area_volver = document.createElement("div");
  area_volver.setAttribute("class", "col flex-column");

  const boton_volver = document.createElement("button");
  boton_volver.setAttribute(
    "class",
    "justify-content-center aling-items-center d-flex mt-1 mx-3 boton_volver"
  );

  const img_volver = document.createElement("img");
  img_volver.setAttribute("src", "/images/atras.png");
  img_volver.setAttribute("class", "img_volver");

  const area_boton_acompañante = document.createElement("div");
  area_boton_acompañante.setAttribute(
    "class",
    "col d-flex justify-contend-end"
  );

  const boton_acompañante = document.createElement("button");
  boton_acompañante.setAttribute(
    "class",
    "boton_acompañante justify-content-center aling-items-center d-flex mt-1 mx-2"
  );

  boton_acompañante.addEventListener("click", () => {
    setAcompañantes(pokemon);
    window.location.reload();
  });

  const img_pokeball = document.createElement("img");
  img_pokeball.setAttribute("src", "/images/pokeball-abierta.png");
  img_pokeball.setAttribute("class", "img_pokeball");

  const area_NombreID = document.createElement("div");
  area_NombreID.setAttribute("class", "row flex-row aling-items-center mt-3");

  const area_nombre = document.createElement("div");
  area_nombre.setAttribute("clas", "col d-flex flex-wrap"); //cuidao

  const nombrePoke = pokemon.nombre;
  const nombre = nombrePoke.charAt(0).toUpperCase() + nombrePoke.slice(1);

  const nombre_borde = document.createElement("h3");
  nombre_borde.textContent = nombre;

  switch (pokemon.color) {
    case "white":
      nombre_borde.setAttribute("class", "borde_blanco fuente_nombre ms-2");
      break;
    case "black":
      nombre_borde.setAttribute("class", "borde_negro fuente_nombre ms-2");
      break;
    case "gray":
      nombre_borde.setAttribute("class", "borde_gris fuente_nombre ms-2");
      break;
    case "red":
      nombre_borde.setAttribute("class", "borde_rojo fuente_nombre ms-2");
      break;
    case "blue":
      nombre_borde.setAttribute("class", "borde_azul fuente_nombre ms-2");
      break;
    case "green":
      nombre_borde.setAttribute("class", "borde_verde fuente_nombre ms-2");
      break;
    case "brown":
      nombre_borde.setAttribute("class", "borde_marron fuente_nombre ms-2");
      break;
    case "yellow":
      nombre_borde.setAttribute("class", "borde_amarillo fuente_nombre ms-2");
      break;
    case "pink":
      nombre_borde.setAttribute("class", "borde_rosa fuente_nombre ms-2");
      break;
    case "purple":
      nombre_borde.setAttribute("class", "borde_morado fuente_nombre ms-2");
      break;
    default:
      break;
  }

  const color_nombre = document.createElement("h3");
  color_nombre.textContent = nombre;
  color_nombre.setAttribute("class", "_nombre ms-2");

  const area_id = document.createElement("div");
  area_id.setAttribute(
    "class",
    "col d-flex flex-wrap justify-content-end me-3"
  );

  const id_ = document.createElement("h4");

  switch (pokemon.color) {
    case "white":
      id_.setAttribute("class", "color_blanco fuente_id d-flex");
      break;
    case "black":
      id_.setAttribute("class", "color_negro fuente_id d-flex");
      break;
    case "gray":
      id_.setAttribute("class", "color_gris fuente_id d-flex");
      break;
    case "red":
      id_.setAttribute("class", "color_rojo fuente_id d-flex");
      break;
    case "blue":
      id_.setAttribute("class", "color_azul fuente_id d-flex");
      break;
    case "green":
      id_.setAttribute("class", "color_verde fuente_id d-flex");
      break;
    case "brown":
      id_.setAttribute("class", "color_marron fuente_id d-flex");
      break;
    case "yellow":
      id_.setAttribute("class", "color_amarillo fuente_id d-flex");
      break;
    case "pink":
      id_.setAttribute("class", "color_rosa fuente_id d-flex");
      break;
    case "purple":
      id_.setAttribute("class", "color_morado fuente_id d-flex");
      break;
    default:
      break;
  }

  if (conteo(pokemon.id) == 1) {
    id_.textContent = "000" + pokemon.id;
  } else if (conteo(pokemon.id) == 2) {
    id_.textContent = "00" + pokemon.id;
  } else if (conteo(pokemon.id) == 3) {
    id_.textContent = "0" + pokemon.id;
  }

  //area ira la img del pokemon en cuestion
  const area_imgPokemonFila = document.createElement("div");
  area_imgPokemonFila.setAttribute(
    "class",
    "row aling-items-center d-flex justify-content-start"
  );

  //columna donde ira la img
  const area_imgPokemonColumna = document.createElement("div");
  area_imgPokemonColumna.setAttribute("class", "col d-flex aling-items-center");
  area_imgPokemonColumna.setAttribute("data-image", "");

  //Img del pokemon
  const imgPokemon = document.createElement("img");
  imgPokemon.setAttribute("src", pokemon.imagen);
  imgPokemon.setAttribute("alt", pokemon.nombre);
  imgPokemon.setAttribute("class", "imagen_tarjeta d-flex");

  //asignar hijos
  area_nombre.appendChild(nombre_borde);
  area_nombre.appendChild(color_nombre);

  area_id.appendChild(id_);

  area_NombreID.appendChild(area_nombre);
  area_NombreID.appendChild(area_id);

  area_imgPokemonColumna.appendChild(imgPokemon);
  area_imgPokemonFila.appendChild(area_imgPokemonColumna);

  //contendra los tipos de pokemons
  const tipos_columna = document.createElement("div");
  tipos_columna.setAttribute(
    "class",
    "col d-flex justify-content-center aling-items-center"
  );

  const arrayDetipos = pokemon.tipos;

  //tipos
  for (let i = 0; i < arrayDetipos.length; i++) {
    let tipo = document.createElement("p");
    tipo.setAttribute("class", "fuente_tipos d-flex");
    tipo.textContent = arrayDetipos[i];

    let forma_tipo = document.createElement("p");
    forma_tipo.setAttribute(
      "class",
      "deccoracion_tipos d-flex ms-1 margen_corto"
    );
    forma_tipo.textContent = "a";

    tipos_columna.appendChild(forma_tipo);
    tipos_columna.appendChild(tipo);
  }

  area_imgPokemonFila.appendChild(tipos_columna);

  const informacion_fila = document.createElement("div");
  informacion_fila.setAttribute("class", "row aling-items d-flex");

  const InfoDiv = document.createElement("div");
  InfoDiv.setAttribute(
    "class",
    "card tarjeta_principal br_infor margen_arriba_principal"
  );

  const NavbarOpciones = document.createElement("div");
  NavbarOpciones.setAttribute(
    "class",
    "row aling-items-center d-flex justify-content-between"
  );

  const btn_informacion = document.createElement("button");
  btn_informacion.setAttribute("class", "botonOp active");
  btn_informacion.textContent = "Informacion";

  const btn_estadisticas = document.createElement("button");
  btn_estadisticas.setAttribute("class", "botonOp");
  btn_estadisticas.textContent = "Estadisticas";

  const btn_movimientos = document.createElement("button");
  btn_movimientos.setAttribute("class", "botonOp");
  btn_movimientos.textContent = "Movimientos";

  const BotonesInfor = [btn_informacion, btn_estadisticas, btn_movimientos];

  function handleButtonClick(event) {
    BotonesInfor.forEach((button) => button.classList.remove("active"));

    event.target.classList.add("active");
  }

  BotonesInfor.forEach((button) =>
    button.addEventListener("click", handleButtonClick)
  );

  const containerInfor = document.createElement("div");
  containerInfor.setAttribute("class", "margen_top d-flex flex-column");

  const filaTemaData = document.createElement("p");
  filaTemaData.setAttribute("class", "fuente_infor ms-2");
  filaTemaData.textContent = "Data";

  const filaSpecie = document.createElement("div");
  filaSpecie.setAttribute("class", "row aling-items-center d-flex");

  const columna_especie = document.createElement("div");
  columna_especie.setAttribute(
    "class",
    "col d-flex justify-content-start col-3 ms-2"
  );

  const NombreEspecie = document.createElement("p");
  NombreEspecie.setAttribute("class", "fuente_data");
  NombreEspecie.textContent = "Especie";

  const columna_especieSecundaria = document.createElement("div");
  columna_especieSecundaria.setAttribute(
    "class",
    "col d-flex justify-content-start"
  );

  const DatosEspecie = document.createElement("p");
  DatosEspecie.setAttribute("class", "fuente_data fw-bold");
  DatosEspecie.textContent = pokemon.especie;

  filaSpecie.appendChild(columna_especie).appendChild(NombreEspecie);
  filaSpecie.appendChild(columna_especieSecundaria).appendChild(DatosEspecie);

  const filaAltura = document.createElement("div");
  filaAltura.setAttribute("class", "row aling-items-center d-flex");

  const columnaAltura = document.createElement("div");
  columnaAltura.setAttribute(
    "class",
    "col d-flex justify-content-start col-3 ms-2"
  );

  const alturaNombre = document.createElement("p");
  alturaNombre.setAttribute("class", "fuente_data");
  alturaNombre.textContent = "Altura";

  const columnaAlturaSecundaria = document.createElement("div");
  columnaAlturaSecundaria.setAttribute(
    "class",
    "col d-flex justify-content-start"
  );

  const AlturaDato = document.createElement("p");
  AlturaDato.setAttribute("class", "fuente_data fw-bold");
  const Alturadecimal = pokemon.altura / 100;
  AlturaDato.textContent =
    pokemon.altura + "cm " + `(${Alturadecimal.toFixed(2)} m)`;

  filaAltura.appendChild(columnaAltura).appendChild(alturaNombre);
  filaAltura.appendChild(columnaAlturaSecundaria).appendChild(AlturaDato);

  const filaPeso = document.createElement("div");
  filaAltura.setAttribute("class", "row aling-items-center d-flex");

  const columnaPeso = document.createElement("div");
  columnaPeso.setAttribute(
    "class",
    "col d-flex justify-content-start col-3 ms-2"
  );

  const PesoNombre = document.createElement("p");
  PesoNombre.setAttribute("class", "fuente_data");
  PesoNombre.textContent = "Peso";

  const columnaPesoSecundario = document.createElement("div");
  columnaAlturaSecundaria.setAttribute(
    "class",
    "col d-flex justify-content-start"
  );

  const PesoDato = document.createElement("p");
  PesoDato.setAttribute("class", "fuente_data fw-bold");
  const PesoRedondeado = Math.round(pokemon.peso * 2.2046);
  PesoDato.textContent =
    pokemon.peso + " kg " + `(${PesoRedondeado.toFixed(2)} lbs)`;

  filaPeso.appendChild(columnaPeso).appendChild(PesoNombre);
  filaPeso.appendChild(columnaPesoSecundario).appendChild(PesoDato);

  const filaHabili = document.createElement("div");
  filaHabili.setAttribute("class", "row aling-items-center d-flex");

  const columnaHabili = document.createElement("div");
  columnaHabili.setAttribute(
    "class",
    "col d-flex justify-content-start col-3 ms-2"
  );

  const HabilidadNombre = document.createElement("p");
  HabilidadNombre.setAttribute("class", "fuente_data");
  HabilidadNombre.textContent = "Habilidades";

  const columnaHabiliSecundario = document.createElement("div");
  columnaAlturaSecundaria.setAttribute(
    "class",
    "col d-flex justify-content-start"
  );

  const HabilidaDatos = document.createElement("p");
  HabilidaDatos.setAttribute("class", "fuente_data fw-bold");
  const habilidadReset = pokemon.habilidades.join(", ");
  HabilidaDatos.textContent = habilidadReset;

  filaHabili.appendChild(columnaHabili).appendChild(HabilidadNombre);
  filaHabili.appendChild(columnaHabiliSecundario).appendChild(HabilidaDatos);

  const filaDebi = document.createElement("div");
  filaDebi.setAttribute("class", "row aling-items-center d-flex");

  const columanDebi = document.createElement("div");
  columanDebi.setAttribute(
    "class",
    "col d-flex justify-content-start col-3 ms-2"
  );

  const NombrDebilidad = document.createElement("p");
  NombrDebilidad.setAttribute("class", "fuente_data");
  NombrDebilidad.textContent = "Debilidades";

  const columanDebiSecundario = document.createElement("div");
  columnaAlturaSecundaria.setAttribute(
    "class",
    "col d-flex justify-content-start"
  );

  const DebilDato = document.createElement("p");
  DebilDato.setAttribute("class", "fuente_dato fw-bold");
  const debilidadesReset = pokemon.debilidades.join(", ");
  DebilDato.textContent = debilidadesReset;

  filaDebi.appendChild(columanDebi).appendChild(NombrDebilidad);
  filaDebi.appendChild(columanDebiSecundario).appendChild(DebilDato);

  const filaTemaCriaPoke = document.createElement("p");
  filaTemaCriaPoke.setAttribute("class", "fuente_data ms-2");
  filaTemaCriaPoke.textContent = "Cria";

  const filahuevo = document.createElement("div");
  filahuevo.setAttribute("class", "row aling-items-center d-flex");

  const columnahuevo = document.createElement("div");
  columnahuevo.setAttribute(
    "class",
    "col d-flex justify-content-start col-3 ms-2"
  );

  const huevoNombre = document.createElement("p");
  huevoNombre.setAttribute("class", "fuente_data");
  huevoNombre.textContent = "Grupo Huevo";

  const columnaHuevoSecundario = document.createElement("div");
  columnaHuevoSecundario.setAttribute(
    "class",
    "col d-flex justify-content-start"
  );

  const huevoDato = document.createElement("p");
  huevoDato.setAttribute("class", "fuente_data fw-bold");
  const huevoReset = pokemon.grupos_huevo.join(", ");
  huevoDato.textContent = huevoReset;

  filahuevo.appendChild(columnahuevo).appendChild(huevoNombre);
  filahuevo.appendChild(columnaHuevoSecundario).appendChild(huevoDato);

  containerInfor.appendChild(filaTemaData);
  containerInfor.appendChild(filaSpecie);
  containerInfor.appendChild(filaAltura);
  containerInfor.appendChild(filaPeso);
  containerInfor.appendChild(filaHabili);
  containerInfor.appendChild(filaDebi);
  containerInfor.appendChild(filaTemaCriaPoke);
  containerInfor.appendChild(filahuevo);

  InfoDiv.appendChild(NavbarOpciones);
  InfoDiv.appendChild(containerInfor);

  informacion_fila.appendChild(InfoDiv);

  area_volver.appendChild(boton_volver).appendChild(img_volver);
  area_boton_acompañante
    .appendChild(boton_acompañante)
    .appendChild(img_pokeball);

  botones.appendChild(area_volver);
  botones.appendChild(area_boton_acompañante);

  dibujarTarjeta.appendChild(botones);
  dibujarTarjeta.appendChild(area_NombreID);
  dibujarTarjeta.appendChild(area_imgPokemonFila);
  dibujarTarjeta.appendChild(informacion_fila);

  area.appendChild(dibujarTarjeta);

  let hijosecundario = main.childNodes[1];

  main.insertBefore(area, hijosecundario.nextSibling);

  boton_volver.addEventListener("click", () => {
    const AreaDiv = document.querySelector("[data-area]");
    if (AreaDiv) {
      AreaDiv.remove();
    }
  });
};

function conteo(numero) {
  return Math.abs(numero).toString().length;
}

export default CardsPokemon;
