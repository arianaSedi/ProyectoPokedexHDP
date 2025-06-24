const obtPokemones = async function () {

    // Declaramos el metodo GET para la variable options que sera pasada como parametro de la funcion fetch
    const options = {
        method: 'GET'
    };

    // Obtenemos los primeros 150 pokemones
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150", options);
    const datos = await respuesta.json(); // Parseamos a JSON la respuesta

    // Obtenemos las URLs individuales de cada Pokemon
    const urlPokemons = datos.results.map(pokemon => pokemon.url);

    // Creamos un array de promesas que obtendran el detalle de cada Pokemon
    const promesasDetalles = urlPokemons.map(url =>
        fetch(url, options).then(res => res.json())
    );

    // Esperamos a que todas las promesas se resuelvan
    const detallesPokemons = await Promise.all(promesasDetalles);

    return detallesPokemons;

}

export default obtPokemones;
