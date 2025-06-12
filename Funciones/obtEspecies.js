//Función para extraer la especie de los pokemon
const obtEspecies = (dtEspecie) => {

    const especieArray = dtEspecie.genera;

    //Almacena la esecie 
    let especies;

    for (let i = 0; i < especieArray.length; i++) {
        //nombre en ingles de las especies de los pokemon 
        if (especieArray[i].language.name == "en") {
            //Se obtiene el nombre de l aespecie del pokemon 
            let cadena = especieArray[i].genus;
            //Se reemplaza o se quita la palabra Pokemon, y se quitan los espacios en blanco 
            let especiePokemon = cadena.replace("Pokémon", "").trim(); 

            //aqui se hace que se muestre ya la especie sin la palabra Pokemon
            especies = especiePokemon;

            break;
        }

    }
    //se retorna la especie 
    return especies;

}
//Para poder usar la funcion en otros archivos 
export default obtEspecies;