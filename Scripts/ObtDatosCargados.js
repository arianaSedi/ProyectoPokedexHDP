import pokemon from "../Clases/Pokemon.js";
import obtPokemones from "../Funciones/obtPokemon.js"
import obtMovimientos from "../Funciones/obtMovimientos.js"
import obtColor from "../Funciones/obtColor.js"
import obtEspecies from "../Funciones/obtEspecies.js"
import obtDebilidades from "../Funciones/obtDebilidades.js"
import obtGrupoHuevos from "../Funciones/obtGrupoHuevos.js"
import getEstadisticas from "../Funciones/obtEstadisticas.js"


const ObtDatosCargados = async () =>{
    try {

        const Pokemons = []
        const colores = []

        const pokemon_detalles = await obtPokemones()

        const opciones = {
            method: 'GET'
        };

        const promesa = pokemon_detalles.map(async (pokemon_detalles) =>{

            const Poke = new pokemon()

            const responde = await fetch(pokemon_detalles.species.url, opciones)
            const dataEspecies = await responde.json();

            Poke.setName(pokemon_detalles.name)
            Poke.setId(pokemon_detalles.id)

            pokemon_detalles.abilities.forEach(ability => Poke.addAbility(ability.ability.name))
            pokemon_detalles.types.forEach(type => Poke.addType(type.type.name))

            Poke.setHeight(pokemon_detalles.height)
            Poke.setWeight(pokemon_detalles.weight)

            const Especie = obtEspecies(dataEspecies)
            Poke.setSpecies(Especie)


            const Debilidades = await obtDebilidades(pokemon_detalles.types)
            Debilidades.forEach(weakness => Poke.addWeakness(weakness))

            const GrupoHuevos = obtGrupoHuevos(dataEspecies)
            GrupoHuevos.forEach(group => Poke.addEggGroup(group))

            const estadisticas = getEstadisticas(pokemon_detalles.stats)
            Poke.setStats(estadisticas)

            const color = obtColor(dataEspecies)
            Poke.setColor(color)
            if(!colores.includes(color)){
                colores.push(color)
            }

        
            pokemon_detalles.moves.slice(0, 5).forEach(m => {
            const nombre = m.move.name.replace("-", " ");
            Poke.addMove(nombre);
            });

            const imgPoke = pokemon_detalles.sprites.other?.['official-artwork']?.front_default;
            Poke.setImage(imgPoke)

            const shiny = pokemon_detalles.sprites.other?.['official-artwork']?.front_shiny
            Poke.setShiny(shiny)


            const sound = pokemon_detalles.cries.latest
            Poke.setSound(sound)

            Pokemons.push(Poke)

        })


        await Promise.all(promesa)

        Pokemons.sort((a,b) => a.getId() - b.getId())

        return Pokemons

        
    } catch (error) {
        console.log("A ocurrido un error a la carga de datos ", error)
    }
}

ObtDatosCargados()

export default ObtDatosCargados;