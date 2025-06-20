const obtEvoluciones = async (especieUrl) => {
  try {
    if (!especieUrl || typeof especieUrl !== "string" || !especieUrl.startsWith("http")) {
      console.warn("URL inválida para obtEvoluciones:", especieUrl);
      return [];
    }

    console.log("speciesUrl recibido en obtEvoluciones:", especieUrl);

    const responseSpecies = await fetch(especieUrl);
    const speciesData = await responseSpecies.json();

    const evo = speciesData.evolution_chain.url;
    console.log("🔗 Buscando evolución en:", evo);

    const responseChain = await fetch(evo);
    const chainData = await responseChain.json();

    const evoluciones = [];

    let actual = chainData.chain;
    while (actual) {
      const nombre = actual.species.name;

      const resPoke = await fetch(`https://pokeapi.co/api/v2/pokemon-species/1/`);
      const pokeData = await resPoke.json();

      evoluciones.push({
        nombre,
        imagen: pokeData.sprites.other["official-artwork"].front_default
      });

      if (actual.evolves_to.length > 0) {
        actual = actual.evolves_to[0];
      } else {
        actual = null;
      }
    }

    return evoluciones;
  } catch (e) {
    console.error("Error al obtener evoluciones:", e.message, e.stack);
    return [];
  }
};

export default obtEvoluciones;