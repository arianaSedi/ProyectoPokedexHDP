const setAcompañantes = (pokemon) =>{
    const abrirConsulta = indexedDB.open("pokemons", 1)

    abrirConsulta.onsuccess = function (e) {
        const database = e.target.result;

        database.onversionchange = function () {
            database.close()
            alert("La DB no está actualizada")
        };

        const transaction = database.transaction("acompañantes", "readwrite")
        const tabla_acompañantes = database.objecStore("acompañantes")

        const countConsulta = tabla_acompañantes.count()

        countConsulta.onsuccess = () => {
            if (countConsulta.result <6){

                //Se verifica si el pokemon ya existe
                const ObtConsulta = tabla_acompañantes.get(pokemon.id)

                ObtConsulta.onsuccess = function(){
                    if (ObtConsulta.result){
                        alert("Ya se ha añadido este pokemon a acompañantes") //Esto por si el pokemon ya esta añadido
                    } 
                    else {
                        const Pokemon_Acompañante = //Si no está añadido, lo añadimos

                        {
                            id: pokemon.id,
                            image: pokemon.imagen,
                            nombre: pokemon.nombre
                        };


                        const AñadirConsulta = tabla_acompañantes.add(Pokemon_Acompañante);


                        AñadirConsulta.onsuccess = function (){
                            console.log("Se añadio como acompañante")
                        };

                        AñadirConsulta.onerror = function(){
                            console.log("Error al añadir al acompañante: ", AñadirConsulta.error)
                        };
                    }
                }

            }
            else{
                alert("Ya tienes 6 acompañantes");
            }
        };

        transaction.oncomplete = function (){
            console.log("Transaccion de acompañantes hecha")
            database.close();
        };

        transaction.onerror = function (event){
            console.log("Error en la trasaccion: ", event.target.error);
        };
    };

    abrirConsulta.onerror = function (event){
        console.log("Error al abrir la Database: ", event.target.error);
    }
};

export default setAcompañantes;