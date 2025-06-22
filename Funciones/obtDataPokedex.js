import Pokedex from "../Clases/Pokedex.js"

const ObtenerDatosDB = () =>{

    const variable = new Pokedex();

    //Abre o crea la db
    let request = indexedDB.open("pokemons", 1)

    request.onsuccess = function (event) {

        let db = event.target.result;
        let transaction = db.transaction("datos", "readonly");
        let objectStore = transaction.objectStore("datos");

        //Obtiene los nombres del objecsotre
        let getallrequest = objectStore.getAll();

        getallrequest.onsuccess = function (event){
            let alldata = event.target.result

            variable.dibujarPokedex(alldata)
        };

        getallrequest.onerror = function (event){
            console.log("Error al obtener los datos ", event.target.error)
        }
    };

    request.onerror = function (event){
        console.log("Error al abrir la db ", event.target.error)
    }
}

export default ObtenerDatosDB