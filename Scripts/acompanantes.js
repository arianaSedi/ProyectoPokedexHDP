// Importar funciones de manipulación con IndexedDB
import {
  obtenerAcompanantes,
  asignarAPequipo,
  eliminarAcompanante,
  obtenerEquipos,
  eliminarDeEquipo as eliminarDelEquipoDB,
  agregarAcompanante,
} from "../Funciones/indexdDB.js";

// Cargar y mostrar los equipos actuales en el DOM
async function cargarEquipos() {
  const contenedor = document.getElementById("listaEquipos");
  contenedor.innerHTML = ""; // Limpiar contenedor

  const equipos = await obtenerEquipos(); // Obtener todos los equipos de la DB

  equipos.forEach((equipo) => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4 mb-4";

    // Cabecera de la tarjeta con el nombre del equipo
    let contenido = `
      <div class="card bg-light text-dark h-100">
        <div class="card-header fw-bold text-center">${equipo.nombre}</div>
        <div class="card-body">
    `;

    // Si el equipo no tiene pokémones
    if (equipo.pokemones.length === 0) {
      contenido += `<p class="text-center">Sin Pokémon asignados</p>`;
    } else {
      // Mostrar todos los pokémones asignados al equipo
      contenido += `<div class="d-flex flex-wrap justify-content-center gap-2">`;
      equipo.pokemones.forEach((poke) => {
        contenido += `
    <div class="position-relative text-center" style="width: 90px;">
      <!-- Botón para eliminar del equipo -->
      <button onclick="eliminarDeEquipo('${equipo.nombre}', ${poke.id})"
              class="btn-close rounded-circle position-absolute top-0 end-0 m-1"
              style="background-color: rgba(255,0,0,0.7);"
              aria-label="Close">
      </button>
      <!-- Imagen del Pokémon -->
      <img src="${poke.image || poke.imagen}" alt="${poke.name || poke.nombre}" class="img-fluid" style="width: 70px;">
    </div>
  `;
      });
      contenido += `</div>`;
    }

    contenido += `</div></div>`;
    card.innerHTML = contenido;
    contenedor.appendChild(card); // Agregar la tarjeta al contenedor
  });
}

// Cargar los acompañantes disponibles (no asignados a un equipo)
async function cargarAcompanantes() {
  const contenedor = document.getElementById("listaAcompanantes");
  let pokemones = await obtenerAcompanantes(); // Obtener todos los acompañantes
  pokemones = Array.isArray(pokemones) ? pokemones : [];

  const equipos = await obtenerEquipos();
  const idsEnEquipos = equipos.flatMap((e) => e.pokemones.map((p) => p.id));

  // Filtrar solo los que no están en ningún equipo
  pokemones = pokemones.filter((p) => !idsEnEquipos.includes(p.id));

  if (pokemones.length === 0) {
    contenedor.innerHTML = "<p class='text-center text-white'>No tienes acompañantes disponibles.</p>";
    return;
  }

  contenedor.innerHTML = "";

  pokemones.forEach((pokemon) => {
    // Mapeo de colores a clases CSS
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

    const claseFondo = coloresTarjeta[pokemon.color] || "fondoTarjetaGris";

    // Select de equipos
    let opciones = '<option value="">Seleccionar equipo</option>';
    equipos.forEach((eq) => {
      opciones += `<option value="${eq.nombre}">${eq.nombre}</option>`;
    });

    // Crear tarjeta HTML para el acompañante
    const card = document.createElement("div");
    card.className = `card text-dark m-2 p-2 col-md-3 ${claseFondo}`;
    card.innerHTML = `
    <img src="${pokemon.image || pokemon.imagen}" class="card-img-top img-fluid">
    <select class="form-select select-pokemon mt-2" id="select-${pokemon.id}">
      ${opciones}
    </select>
    <button class="btn btn-asignar mt-2" onclick="asignar(${pokemon.id})">Asignar a equipo</button>
    <button class="btn btn-eliminar mt-2" onclick="eliminar(${pokemon.id})">Eliminar</button>
  `;
    contenedor.appendChild(card);
  });
}

// Muestra una animación + sonido al eliminar
function mostrarAnimacionEliminacion() {
  const anim = document.getElementById("eliminacionAnimacion");
  const sonido = document.getElementById("audio-eliminar");

  if (anim && sonido) {
    anim.classList.remove("oculto");
    sonido.currentTime = 0;
    sonido.play();

    // Ocultar la animación luego de 1.5s
    setTimeout(() => {
      anim.classList.add("oculto");
    }, 1500);
  }
}

// Asignar un Pokémon acompañante a un equipo
window.asignar = async function (id) {
  const select = document.getElementById(`select-${id}`);
  const equipo = select.value;
  if (!equipo) return alert("Selecciona un equipo");

  const pokemones = await obtenerAcompanantes();
  const pokemon = pokemones.find((p) => p.id === id);

  const mensaje = await asignarAPequipo(equipo, pokemon);
  alert(mensaje);

  if (mensaje === "Pokémon asignado con éxito") {
    await eliminarAcompanante(id); // quitarlo de acompañantes
    await cargarAcompanantes();    // actualizar vista de acompañantes
    await cargarEquipos();         // actualizar vista de equipos
  }
};

// Eliminar un Pokémon de la lista de acompañantes
window.eliminar = async function (id) {
  if (!confirm("¿Seguro que deseas eliminar este acompañante?")) return;

  mostrarAnimacionEliminacion(); // Mostrar animación y sonido

  setTimeout(async () => {
    await eliminarAcompanante(id); // eliminar en la DB
    await cargarAcompanantes();    // actualizar vista
  }, 1500); // espera que termine el gif
};

// Eliminar un Pokémon de un equipo y devolverlo a los acompañantes
window.eliminarDeEquipo = async (nombreEquipo, id) => {
  const equipos = await obtenerEquipos();
  const equipo = equipos.find((eq) => eq.nombre === nombreEquipo);
  const pokemon = equipo.pokemones.find((p) => p.id === id);

  await eliminarDelEquipoDB(nombreEquipo, id); // quitar de la DB

  // Obtener el color si no está definido (necesario para fondo)
  if (pokemon && !pokemon.color) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
      const data = await response.json();
      pokemon.color = data.color.name;
    } catch (error) {
      console.error("No se pudo obtener el color del Pokémon", error);
      pokemon.color = "gray";
    }
  }

  // Volver a agregarlo a acompañantes
  if (pokemon) {
    await agregarAcompanante(pokemon);
  }

  // Actualizar las vistas
  await cargarAcompanantes();
  await cargarEquipos();
};

// Ejecutar funciones una vez cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarAcompanantes();
  cargarEquipos();
});
