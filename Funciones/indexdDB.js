// indexedDB.js

// Función para abrir (o crear) la base de datos "AcompanantesDB"
export async function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AcompanantesDB", 1);

    // Evento que se ejecuta si es la primera vez o si hay cambios en la versión
    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Crear almacén de objetos "acompanantes" con clave 'id'
      if (!db.objectStoreNames.contains("acompanantes")) {
        db.createObjectStore("acompanantes", { keyPath: "id" });
      }

      // Crear almacén de objetos "equipos" con clave 'nombre'
      if (!db.objectStoreNames.contains("equipos")) {
        const equiposStore = db.createObjectStore("equipos", {
          keyPath: "nombre",
        });

        // Crear 5 equipos predeterminados vacíos
        ["Entrenadora Ariana", "Entrenadora Angelica", "Entrenador Diego", "Entrenador Freddy", "Entrenador Ivan"].forEach(
          (nombre) => {
            equiposStore.add({ nombre: nombre, pokemones: [] });
          }
        );
      }
    };

    request.onsuccess = () => resolve(request.result); // DB abierta con éxito
    request.onerror = () => reject("No se pudo abrir la base de datos IndexedDB");
  });
}

// Agrega un Pokémon a los acompañantes si hay espacio y no está repetido
export async function agregarAcompanante(pokemon) {
  const db = await abrirDB();

  // Leer todos los acompañantes actuales
  const txRead = db.transaction("acompanantes", "readonly");
  const storeRead = txRead.objectStore("acompanantes");
  const acompanantes = await new Promise((resolve, reject) => {
    const req = storeRead.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener acompañantes");
  });

  // Validar si ya existe
  if (acompanantes.find(p => p.id === pokemon.id)) {
    return "Este Pokémon ya está en tus acompañantes";
  }

  // Validar si ya hay 6 acompañantes
  if (acompanantes.length >= 6) {
    return "No puedes tener más de 6 acompañantes";
  }

  // Insertar en la base de datos
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

// Obtener todos los acompañantes
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

// Asigna un Pokémon a un equipo si no tiene ya uno
export async function asignarAPequipo(nombreEquipo, pokemon) {
  const db = await abrirDB();
  const tx = db.transaction("equipos", "readwrite");
  const store = tx.objectStore("equipos");

  // Buscar equipo por nombre
  const equipo = await new Promise((resolve, reject) => {
    const req = store.get(nombreEquipo);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener equipo");
  });

  if (!equipo) throw new Error("Equipo no encontrado");

  // Solo se permite un Pokémon por equipo
  if (equipo.pokemones.length >= 1) {
    return "Este equipo ya tiene un Pokémon asignado";
  }

  // Verificar si el Pokémon ya está en el equipo
  if (equipo.pokemones.some(p => p.id === pokemon.id)) {
    return "Este Pokémon ya está en el equipo";
  }

  // Agregar clon del Pokémon con solo la información necesaria
  const copiaPokemon = {
    id: pokemon.id,
    name: pokemon.name || pokemon.nombre || "Sin nombre",
    image: pokemon.image || pokemon.imagen || "images/pokeball.png"
  };

  equipo.pokemones.push(copiaPokemon); // Asignar
  await store.put(equipo); // Guardar cambios
  return "Pokémon asignado con éxito";
}

// Obtener todos los equipos
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

// Elimina un Pokémon de un equipo y lo devuelve a acompañantes si hay espacio
export async function eliminarDeEquipo(nombreEquipo, pokemonId) {
  const db = await abrirDB();

  // Validar si hay espacio en acompañantes
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

  // Obtener el equipo y eliminar el Pokémon por ID
  const txE = db.transaction("equipos", "readwrite");
  const storeE = txE.objectStore("equipos");
  const equipo = await new Promise((resolve, reject) => {
    const req = storeE.get(nombreEquipo);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error al obtener equipo");
  });

  const pokemon = equipo.pokemones.find(p => p.id === pokemonId);

  // Quitar del array
  equipo.pokemones = equipo.pokemones.filter(p => p.id !== pokemonId);
  await storeE.put(equipo); // Guardar cambios en el equipo

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

// Elimina un Pokémon del almacén de acompañantes
export async function eliminarAcompanante(id) {
  const db = await abrirDB();
  const tx = db.transaction("acompanantes", "readwrite");
  const store = tx.objectStore("acompanantes");
  await store.delete(id); // Borrar por ID
  await tx.done;
}



