// indexedDB.js

export async function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AcompanantesDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Crear almacén para acompañantes (clave: id del Pokémon)
      if (!db.objectStoreNames.contains("acompanantes")) {
        db.createObjectStore("acompanantes", { keyPath: "id" });
      }

      // Crear almacén para equipos (clave: nombre del equipo)
      if (!db.objectStoreNames.contains("equipos")) {
        const equiposStore = db.createObjectStore("equipos", {
          keyPath: "nombre",
        });

        // Crear 5 equipos por defecto
        ["Entrenadora Ariana", "Entrenadora Angelica", "Entrenador Diego", "Entrenador Freddy", "Entrenador Ivan"].forEach(
          (nombre) => {
            equiposStore.add({ nombre: nombre, pokemones: [] });
          }
        );
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject("No se pudo abrir la base de datos IndexedDB");
  });
}

export async function agregarAcompanante(pokemon) {
  const db = await abrirDB();

  // Transacción para leer acompañantes
  const txReadA = db.transaction("acompanantes", "readonly");
  const storeReadA = txReadA.objectStore("acompanantes");

  const acompanantes = await new Promise((resolve, reject) => {
    const req = storeReadA.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener acompañantes");
  });

  // Transacción para leer equipos
  const txReadE = db.transaction("equipos", "readonly");
  const storeReadE = txReadE.objectStore("equipos");

  const equipos = await new Promise((resolve, reject) => {
    const req = storeReadE.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener equipos");
  });

  const pokemonesEnEquipos = equipos.flatMap(e => e.pokemones || []);
  const total = acompanantes.length + pokemonesEnEquipos.length;

  if (total >= 6) {
    return "No puedes tener más de 6 Pokémon entre acompañantes y equipos";
  }

  const yaExiste = acompanantes.find(p => p.id === pokemon.id);
  if (yaExiste) {
    return "Este Pokémon ya está en tus acompañantes";
  }

  // ✅ NUEVA transacción para escribir
  const txWrite = db.transaction("acompanantes", "readwrite");
  const storeWrite = txWrite.objectStore("acompanantes");

  storeWrite.put({
    id: pokemon.id,
    name: pokemon.name || pokemon.nombre || "Sin nombre",
    image: pokemon.image || pokemon.imagen || "images/pokeball.png"
  });

  return "Pokémon agregado correctamente";
}

export async function obtenerAcompanantes() {
  const db = await abrirDB();
  const tx = db.transaction("acompanantes", "readonly");
  const store = tx.objectStore("acompanantes");

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener acompañantes");
  });
}

export async function asignarAPequipo(nombreEquipo, pokemon) {
  const db = await abrirDB();
  const tx = db.transaction("equipos", "readwrite");
  const store = tx.objectStore("equipos");

  const equipo = await new Promise((resolve, reject) => {
    const req = store.get(nombreEquipo);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener equipo");
  });

  if (!equipo) throw new Error("Equipo no encontrado");

  if (equipo.pokemones.length >= 1) {
    return "Este equipo ya tiene un Pokémon asignado";
  }

  if (equipo.pokemones.some(p => p.id === pokemon.id)) {
    return "Este Pokémon ya está en el equipo";
  }

  // ✅ Clonamos solo los campos necesarios
  const copiaPokemon = {
    id: pokemon.id,
    name: pokemon.name || pokemon.nombre || "Sin nombre",
    image: pokemon.image || pokemon.imagen || "images/pokeball.png"
  };

  equipo.pokemones.push(copiaPokemon);
  await store.put(equipo);
  return "Pokémon asignado con éxito";
}



export async function obtenerEquipos() {
  const db = await abrirDB();
  const tx = db.transaction("equipos", "readonly");
  const store = tx.objectStore("equipos");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener equipos");
  });
}

export async function eliminarAcompanante(id) {
  const db = await abrirDB();
  const tx = db.transaction("acompanantes", "readwrite");
  const store = tx.objectStore("acompanantes");
  await store.delete(id);
  await tx.done;
}

export async function eliminarDeEquipo(nombreEquipo, pokemonId) {
  const db = await abrirDB();
  const tx = db.transaction("equipos", "readwrite");
  const store = tx.objectStore("equipos");

  const equipo = await new Promise((resolve, reject) => {
    const req = store.get(nombreEquipo);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener equipo");
  });

  equipo.pokemones = equipo.pokemones.filter((p) => p.id !== pokemonId);
  await store.put(equipo);
}
