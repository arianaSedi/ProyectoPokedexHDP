import Pokemon from "../Clases/Pokemon.js";
import obtPokemones from "../Funciones/obtPokemon.js";
import obtMovimientos from "../Funciones/obtMovimientos.js";
import obtColor from "../Funciones/obtColor.js";
import obtEspecies from "../Funciones/obtEspecies.js";
import obtDebilidades from "../Funciones/obtDebilidades.js";
import obtGrupoHuevos from "../Funciones/obtGrupoHuevos.js";
import getEstadisticas from "../Funciones/obtEstadisticas.js";
import obtEvoluciones from "../Funciones/obtEvoluciones.js";

const ObtDatosCargados = async () => {
  const Pokemons = [];
  const colores = [];

  const detallesPokemones = await obtPokemones();
  const opciones = { method: "GET" };

  const promesa = detallesPokemones.map(async (detalle) => {
    const especieUrl = detalle?.species?.url;
    if (!especieUrl) return;

    const Poke = new Pokemon();

    //Poke.setSpecies(especieUrl);
    Poke.setSpecies(detalle.species.url);

    const respuesta = await fetch(especieUrl, opciones);
    const dataEspecies = await respuesta.json();

    Poke.setName(detalle.name);
    Poke.setId(detalle.id);

    detalle.abilities.forEach((ab) => Poke.addAbility(ab.ability.name));
    detalle.types.forEach((tp) => Poke.addType(tp.type.name));

    Poke.setHeight(detalle.height);
    Poke.setWeight(detalle.weight);

    const debiles = await obtDebilidades(detalle.types);
    debiles.forEach((d) => Poke.addWeakness(d));

    const grupos = obtGrupoHuevos(dataEspecies);
    grupos.forEach((g) => Poke.addEggGroup(g));

    Poke.setStats(getEstadisticas(detalle.stats));

    const color = obtColor(dataEspecies);
    Poke.setColor(color);
    if (!colores.includes(color)) colores.push(color);

    const movimientos = await obtMovimientos(detalle.moves);
    movimientos.forEach((m) => Poke.addMove(m));

    const imagen = detalle.sprites.other?.["official-artwork"]?.front_default;
    Poke.setImage(imagen);
    
    const shiny = detalle.sprites.other?.["official-artwork"]?.front_shiny;
    Poke.setShiny(shiny);

    const evo = await obtEvoluciones(especieUrl);
    Poke.setEvolution(evo);

    const sonido = detalle.cries?.latest;
    Poke.setSound(sonido);

    Pokemons.push(Poke);
  });

  await Promise.all(promesa);
  Pokemons.sort((a, b) => a.getId() - b.getId());
  return Pokemons;
};

export default ObtDatosCargados;
