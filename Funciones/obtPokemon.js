const obtPokemones = async function () {
  const options = { method: 'GET' };

  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150", options);
  const datos = await respuesta.json();
  const urlPokemons = datos.results.map(p => p.url);

  const detalles = await Promise.all(
    urlPokemons.map(url => fetch(url, options).then(res => res.json()))
  );

  const pokemones = detalles.map(p => ({
    id: p.id,
    nombre: p.name,
    imagen: p.sprites.other["official-artwork"].front_default,
    tipos: p.types.map(t => t.type.name),
    habilidades: p.abilities.map(a => a.ability.name),
    peso: p.weight,
    altura: p.height,
    estadisticas: p.stats,
    moves: p.moves, // necesario para Moves
    species_url: p.species.url, // necesario para Evolution
    color: "gray" // opcional
  }));

  return pokemones;
};

export default obtPokemones;