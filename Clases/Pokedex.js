import CardsPokemon from "./CardsPokemon.js";
import Tarjetas_Pokemon from "./CardsPokemon.js";

class Pokedex {
  async renderPokedex(data) {
    const Pokemon = data;

    const contenedor = document.createElement("div");
    contenedor.setAttribute(
      "class",
      "pokedex-pantalla container-fluid d-flex flex-wrap justify-content"
    );

    for (let i = 0; i < Pokemon.length; i++) {
      const main = document.querySelector("main");
      const contenedorTarjeta = document.createElement("div");

      switch (Pokemon[i].color) {
        case "white":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaBlanco rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "black":
          contenedorTarjeta.setAttribute(
            "class",
            "card  fondoTarjetaNegro rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "gray":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaGris rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "red":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaRojo rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "blue":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaAzul rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "green":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaVerde rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "brown":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaMarron rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "yellow":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaAmarillo rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "pink":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaRosa rounded-3 mx-3 my-3  formacursor"
          );
          break;
        case "purple":
          contenedorTarjeta.setAttribute(
            "class",
            "card fondoTarjetaMorado rounded-3 mx-3 my-3  formacursor"
          );
          break;
        default:
          break;
      }

      contenedorTarjeta.addEventListener("click", () =>{
        CardsPokemon(Pokemon[i])
      })

      const Cuerpo_tarjeta = document.createElement("div")
      Cuerpo_tarjeta.setAttribute("class", "card-body")

      const fila_p = document.createElement("div")
      fila_p.setAttribute("class", "row text-end")

      const h5p = document.createElement("h5")

      //filtrar por color y letra del id

      switch(Pokemon[i].color){
        case "white":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_blancop")
            break;
        case "black":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_negrop")
            break;
        case "gray":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_grisp")
            break;
        case "red":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_rojop")
            break;
        case "blue":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_azulp")
            break;
        case "green":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_verdep")
            break;
        case "brown":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_marronp")
            break;
        case "yellow":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_amarillop")
            break;
        case "pink":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_rosap")
            break;
        case "purple":
            h5p.setAttribute("class", "fuente_idPokedex margen_abajo color_moradop")
            break;
        default:
            break;
      }

      const IDS = Pokemon[i].id.toString()

      if (IDS.length === 1){
        h5p.textContent = "N " + "'000" + IDS
      }
      else if(IDS.length === 2){
        h5p.textContent = "N " + "'00" + IDS
      }
      else if(IDS.length === 3){
        h5p.textContent = "N " + "'0" + IDS
      }

      const nombre = Pokemon[i].nombre
      const nombrePoke = nombre.charAt(0).toUpperCase() + nombre.slice(1)
      
      const titulo_tarjeta = document.createElement("div")
      titulo_tarjeta.setAttribute("class", "row position-relative text-center margen_arriba")

      const titulo_sombra = document.createElement("h3")

      switch (Pokemon[i].color){
                case "white":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-white ")
            break;
        case "black":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-negro ")
            break;
        case "gray":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-gris")
            break;
        case "red":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-rojo")
            break;
        case "blue":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-azul")
            break;
        case "green":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-verde")
            break;
        case "brown":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-marron")
            break;
        case "yellow":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-amarillo")
            break;
        case "pink":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-rosa")
            break;
        case "purple":
            titulo_sombra.setAttribute("class", "fuente_nombreP contorno-morado")
            break;
        default:
            break;
      }

      titulo_sombra.textContent=nombrePoke

      const titulos = document.createElement("h3")
      titulo_sombra.setAttribute("class", "fuente_nombreP")

      titulos.textContent = nombrePoke

      const imagen_tarjeta = document.createElement("div")
      imagen_tarjeta.setAttribute("class", "row")

      const imagen_pokemonPokedex = document.createElement("img")
      imagen_pokemonPokedex.setAttribute("src", Pokemon[i].imagen)
      imagen_pokemonPokedex.setAttribute("class", "imagen_tarjetaPokedex margen_arriba margen_abajo")
      imagen_pokemonPokedex.setAttribute("alt", Pokemon[i].imagen)

      const tipos_contenedor = document.createElement("div")
      tipos_contenedor.setAttribute("class", "row d-flex")

      const ArraydeTipos = Pokemon[i].tipos

      let ColumnaTipo = null

      for (let y=0; y< ArraydeTipos.length; y++){
        if(y %2 === 0){//Cada vez que sea multiplo de 2 se va a dividir en una columna
          ColumnaTipo = document.createElement("div")
          ColumnaTipo.setAttribute("class", "col d-flex flex-column") // columna que contiene a dos tipos
          tipos_contenedor.appendChild(ColumnaTipo)
        }

        const tipo = document.createElement("div") // contenedor que tiene adentro el texto como tipo
        tipo.setAttribute("class", "d-flex aling-items-center margen_acercar_arriba")

        const circuloDEtipo = document.createElement("p")
        const name = document.createElement("p")

        switch(ArraydeTipos[y]){

          case "ghost":
            circuloDEtipo.setAttribute("class","color_morado fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color morado contorni-tipos" )
            name.textContent = ArraydeTipos[y]
            break;
         
            case "dragon":
            circuloDEtipo.setAttribute("class","color_rojo fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_rojo contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;
            
            case "fighting":
            circuloDEtipo.setAttribute("class","color_marron fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_marron contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "psychic":
            circuloDEtipo.setAttribute("class","color_rosa fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_rosa contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "rock":
            circuloDEtipo.setAttribute("class","color_gris fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_gris contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "steel":
            circuloDEtipo.setAttribute("class","color_gris fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_gris contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "ice":
            circuloDEtipo.setAttribute("class","color_blanco fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_blanco contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "grass":
            circuloDEtipo.setAttribute("class","color_verde fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_verde contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "poison":
            circuloDEtipo.setAttribute("class","color_morado fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_morado contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "fire":
            circuloDEtipo.setAttribute("class","color_rojo fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_rojo contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "flying":
            circuloDEtipo.setAttribute("class","color_blanco fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_blanco contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "water":
            circuloDEtipo.setAttribute("class","color_azul fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_azul contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "bug":
            circuloDEtipo.setAttribute("class","color_verde fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_verde contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "electric":
            circuloDEtipo.setAttribute("class","color_amarillo fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_amarillo contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "normal":
            circuloDEtipo.setAttribute("class","color_gris fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_gris contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "ground":
            circuloDEtipo.setAttribute("class","color_marron fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_marron contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

            case "fairy":
            circuloDEtipo.setAttribute("class","color_rosa fuente_circle_ contorno-tipos")
            circuloDEtipo.textContent = "a"

            name.setAttribute("class","fuente_tiposPoke ms-2 color_rosa contorno-tipos" )
            name.textContent = ArraydeTipos[y]
            break;

          default:
            break;

        }

        tipo.appendChild(circuloDEtipo)
        tipo.appendChild(name)
        ColumnaTipo.appendChild(tipo)

      }

      contenedorTarjeta.appendChild(Cuerpo_tarjeta)
      contenedor.appendChild(contenedorTarjeta)
      Cuerpo_tarjeta.appendChild(fila_p).appendChild(h5p)
      Cuerpo_tarjeta.appendChild(titulo_tarjeta)
      titulo_tarjeta.appendChild(titulo_sombra)
      titulo_tarjeta.appendChild(titulos)
      Cuerpo_tarjeta.appendChild(imagen_tarjeta).appendChild(imagen_pokemonPokedex)
      main.appendChild(contenedor)
      
    }
  }
}
export default Pokedex;