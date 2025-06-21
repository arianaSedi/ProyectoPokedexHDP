// Función que obtiene la cadena evolutiva desde una species URL
const obtEvoluciones = async (speciesUrl) => {
  try {
    // Validación estricta para evitar errores 
    if (
      !speciesUrl ||
      typeof speciesUrl !== "string" ||
      !speciesUrl.startsWith("http")
    ) {
      console.warn("URL inválida para obtEvoluciones:", speciesUrl);
      return [];
    }

    console.log("speciesUrl recibido en obtEvoluciones:", speciesUrl);

    //  Obtener datos de la especie
    const responseSpecies = await fetch(speciesUrl);
    const speciesData = await responseSpecies.json();

    //Obtener URL de la cadena evolutiva
    const evoUrl = speciesData.evolution_chain.url;
    console.log("Buscando evolución en:", evoUrl);

    // Obtener la cadena evolutiva completa
    const responseChain = await fetch(evoUrl);
    const chainData = await responseChain.json();

    const evoluciones = [];
    let actual = chainData.chain;

    // Recorrer la cadena evolutiva
    while (actual) {
      const nombre = actual.species.name;

      const resPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      const pokeData = await resPoke.json();

      evoluciones.push({
        nombre,
        imagen: pokeData.sprites.other["official-artwork"].front_default || "",
      });

      actual = actual.evolves_to[0] || null;
    }

    return evoluciones;
  } catch (e) {
    console.error("Error al obtener evoluciones:", e.message, e.stack);
    return [];
  }
};

export default obtEvoluciones;
