import ObtDatosCargados from "../Scripts/ObtDatosCargados.js"
import ObtenerDatosDB from "../Funciones/obtDataPokedex.js"

const openConsulta = indexedDB.open("pokemons", 1)

//Se verifica si existe o no
openConsulta.onupgradeneeded = function (event){
    const db = event.target.result

    if (!db.objectStoreNames.contains("datos")){
        db.createObjectStore("datos", {keyPath: 'id', autoIncrement:true})

    }

    if(!db.objectStoreNames.contains("acompañantes")){
        db.createObjectStore("acompañantes", {keyPath: 'id', autoIncrement:true})
    }
}

openConsulta.onsuccess = async function (event){
    const db = event.target.result

    db.onversionchange = function(){
        db.close()
        alert("La base de datos no está actualizada")
    }

    const transaction = db.transaction("datos", "readonly")
    const tabla_datos = transaction.objectStore("datos")

    const  contadorConsulta = tabla_datos.count()

    contadorConsulta.onsuccess = async function () {
        //se verifica si la tabla ya contiene elementos

        if(contadorConsulta.result == 0){
            console.log("Cargando datos")
            //Si no hay datos, carga e inserta
            const ArrayPokemones = await ObtDatosCargados()

            const transaction = db.transaction("datos", "readwrite")

            transaction.oncomplete = function(){
                console.log("Trasaccion completada")
            }

            transaction.onerror = function (event){
                console.log("Trasanccion erronea ", event.target.errpr)
            }

            const tabla_datos = transaction.objectStore("datos")

            //convertimos e insertamos datos
            for(let i=0; i< ArrayPokemones.length; i++){
                let pokemon = ArrayPokemones[i]
                let request = tabla_datos.add(pokemon.toJSON()) //convertimos a json

                request.onsuccess = function(){
                    console.log("Pokemon agregado")
                }

                request.onerror = function(){
                    console.log("error al agregar pokemon", request.error)
                }
            }

            alert("Porfavor, recargue la pagina")
            window.location.reload()

        }
        else{
            console.log("La tabla ya contiene datos, no se permiten nuevos datos")
            ObtenerDatosDB()
        }
    }

    contadorConsulta.onerror = function(event){
        console.log("Error al contar ", event.target.error)
    }

}