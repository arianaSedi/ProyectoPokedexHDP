import {
  obtenerAcompanantes,
  asignarAPequipo,
  eliminarAcompanante,
  obtenerEquipos,
  eliminarDeEquipo as eliminarDelEquipoDB,
  agregarAcompanante,
} from "../Funciones/indexdDB.js";

async function cargarEquipos() {
  const contenedor = document.getElementById("listaEquipos");
  contenedor.innerHTML = ""; // limpiar

  const equipos = await obtenerEquipos();

  equipos.forEach((equipo) => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4 mb-4";

    let contenido = `
      <div class="card bg-light text-dark h-100">
        <div class="card-header fw-bold text-center">${equipo.nombre}</div>
        <div class="card-body">
    `;

    if (equipo.pokemones.length === 0) {
      contenido += `<p class="text-center">Sin Pokémon asignados</p>`;
    } else {
      contenido += `<div class="d-flex flex-wrap justify-content-center gap-2">`;
      equipo.pokemones.forEach((poke) => {
        contenido += `
          <div class="position-relative text-center" style="width: 90px;">
            <button onclick="eliminarDeEquipo('${equipo.nombre}', ${poke.id})"
                    class="btn-close rounded-circle position-absolute top-0 end-0 m-1"
                    style="background-color: rgba(255,0,0,0.7);"
                    aria-label="Close">
            </button>
            <img src="${poke.image || poke.imagen}" alt="${
          poke.name || poke.nombre
        }" class="img-fluid" style="width: 70px;">
            <p class="mb-0">${poke.name || poke.nombre}</p>
          </div>
        `;
      });
      contenido += `</div>`;
    }

    contenido += `</div></div>`;
    card.innerHTML = contenido;
    contenedor.appendChild(card);
  });
}

async function cargarAcompanantes() {
  const contenedor = document.getElementById("listaAcompanantes");
  let pokemones = await obtenerAcompanantes();
  pokemones = Array.isArray(pokemones) ? pokemones : [];

  const equipos = await obtenerEquipos();
  const idsEnEquipos = equipos.flatMap((e) => e.pokemones.map((p) => p.id));

  // Filtrar solo los que no están ya asignados
  pokemones = pokemones.filter((p) => !idsEnEquipos.includes(p.id));

  if (pokemones.length === 0) {
    contenedor.innerHTML =
      "<p class='text-center text-white'>No tienes acompañantes disponibles.</p>";
    return;
  }

  contenedor.innerHTML = "";

  pokemones.forEach((pokemon) => {
    let opciones = '<option value="">Seleccionar equipo</option>';
    equipos.forEach((eq) => {
      opciones += `<option value="${eq.nombre}">${eq.nombre}</option>`;
    });

    const card = document.createElement("div");
    card.className = "card text-dark m-2 p-2 col-md-3";
    card.innerHTML = `
    <h5 class="text-center">${pokemon.name || pokemon.nombre}</h5>
    <img src="${
      pokemon.image || pokemon.imagen
    }" class="card-img-top img-fluid">
    <select class="form-select mt-2" id="select-${pokemon.id}">
      ${opciones}
    </select>
    <button class="btn btn-primary mt-2" onclick="asignar(${
      pokemon.id
    })">Asignar a equipo</button>
    <button class="btn btn-danger mt-2" onclick="eliminar(${
      pokemon.id
    })">Eliminar</button>
  `;
    contenedor.appendChild(card);
  });
}

window.asignar = async function (id) {
  const select = document.getElementById(`select-${id}`);
  const equipo = select.value;
  if (!equipo) return alert("Selecciona un equipo");

  const pokemones = await obtenerAcompanantes();
  const pokemon = pokemones.find((p) => p.id === id);
  const mensaje = await asignarAPequipo(equipo, pokemon);

  alert(mensaje);

  if (mensaje === "Pokémon asignado con éxito") {
    await eliminarAcompanante(id); // lo quita de acompañantes
    await cargarAcompanantes();
    await cargarEquipos();
  }
};

window.eliminar = async function (id) {
  if (confirm("¿Seguro que deseas eliminar este acompañante?")) {
    await eliminarAcompanante(id);
    await cargarAcompanantes();
  }
};

window.eliminarDeEquipo = async (nombreEquipo, id) => {
  const equipos = await obtenerEquipos();
  const equipo = equipos.find((eq) => eq.nombre === nombreEquipo);
  const pokemon = equipo.pokemones.find((p) => p.id === id);

  // 1. Eliminar del equipo
  await eliminarDelEquipoDB(nombreEquipo, id);

  // 2. Regresarlo a acompañantes
  if (pokemon) {
    await agregarAcompanante(pokemon);
  }

  // 3. Actualizar vista
  await cargarAcompanantes();
  await cargarEquipos();
};

// ⚠️ Esperar al DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarAcompanantes();
  cargarEquipos();
});
