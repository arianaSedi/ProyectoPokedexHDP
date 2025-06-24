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

// Modificación de la validación de agregarAcompanante y eliminarDeEquipo

export async function agregarAcompanante(pokemon) {
  const db = await abrirDB();

  const txRead = db.transaction("acompanantes", "readonly");
  const storeRead = txRead.objectStore("acompanantes");
  const acompanantes = await new Promise((resolve, reject) => {
    const req = storeRead.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener acompañantes");
  });

  if (acompanantes.find(p => p.id === pokemon.id)) {
    return "Este Pokémon ya está en tus acompañantes";
  }

  if (acompanantes.length >= 6) {
    return "No puedes tener más de 6 acompañantes";
  }

  const txWrite = db.transaction("acompanantes", "readwrite");
  const storeWrite = txWrite.objectStore("acompanantes");
  await storeWrite.put({
    id: pokemon.id,
    name: pokemon.name || pokemon.nombre || "Sin nombre",
    image: pokemon.image || pokemon.imagen || "images/pokeball.png",
    color: pokemon.color || "gray"
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

// Modificación de eliminarDeEquipo
export async function eliminarDeEquipo(nombreEquipo, pokemonId) {
  const db = await abrirDB();

  // Obtener lista actual de acompañantes
  const txA = db.transaction("acompanantes", "readonly");
  const storeA = txA.objectStore("acompanantes");
  const acompanantes = await new Promise((resolve, reject) => {
    const req = storeA.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener acompañantes");
  });

  if (acompanantes.length >= 6) {
    alert("No puedes eliminar este Pokémon del equipo porque ya tienes 6 acompañantes. Elimina primero uno de tus acompañantes.");
    return;
  }

  // Obtener el equipo y el pokémon a eliminar
  const txE = db.transaction("equipos", "readwrite");
  const storeE = txE.objectStore("equipos");
  const equipo = await new Promise((resolve, reject) => {
    const req = storeE.get(nombreEquipo);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener equipo");
  });

  const pokemon = equipo.pokemones.find(p => p.id === pokemonId);

  equipo.pokemones = equipo.pokemones.filter(p => p.id !== pokemonId);
  await storeE.put(equipo);

  // Regresar el Pokémon a acompañantes
  const txW = db.transaction("acompanantes", "readwrite");
  const storeW = txW.objectStore("acompanantes");
  await storeW.put({
    id: pokemon.id,
    name: pokemon.name || pokemon.nombre || "Sin nombre",
    image: pokemon.image || pokemon.imagen || "images/pokeball.png",
    color: pokemon.color || "gray"
  });
}  

export async function eliminarAcompanante(id) {
  const db = await abrirDB();
  const tx = db.transaction("acompanantes", "readwrite");
  const store = tx.objectStore("acompanantes");
  await store.delete(id);
  await tx.done;
}


