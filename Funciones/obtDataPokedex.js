import Pokedex from "../Clases/Pokedex.js";

const ObtenerDatosDB = () => {
  const variable = new Pokedex();

  //Abre o crea la db
  let request = indexedDB.open("pokemons", 1);

  request.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction("datos", "readonly");
    let objectStore = transaction.objectStore("datos");

    //Obtiene los nombres del objecsotre
    let getallrequest = objectStore.getAll();

    getallrequest.onsuccess = function (event) {
      let alldata = event.target.result;

      variable.dibujarpokedex(alldata);

            // Funcipn que aplica ambos filtros a la vez
            function aplicarFiltros() {
            const texto = document.getElementById("busqueda-pokemon").value.toLowerCase();
            const tipoSeleccionado = document.getElementById("filtro-tipo").value.toLowerCase();
            const tarjetas = document.querySelectorAll(".FiltroBuscarPokemon");

            tarjetas.forEach((card) => {
                const nombre = card.querySelector(".fuente_nombre")?.textContent.toLowerCase() || "";
                const id = card.querySelector(".fuente_idPokedex")?.textContent.toLowerCase() || "";
                const tipos = Array.from(card.querySelectorAll(".ColorTipo"))
                .map((el) => el.textContent.toLowerCase());

                const coincideTexto = nombre.includes(texto) || id.includes(texto);
                const coincideTipo = tipoSeleccionado === "todos" || tipos.includes(tipoSeleccionado);

                card.style.display = coincideTexto && coincideTipo ? "block" : "none";
            });
            }

            document.getElementById("busqueda-pokemon").addEventListener("input", aplicarFiltros);
            document.getElementById("filtro-tipo").addEventListener("change", aplicarFiltros);


              };

    getallrequest.onerror = function (event) {
      console.log("Error al obtener los datos ", event.target.error);
    };
  };

  request.onerror = function (event) {
    console.log("Error al abrir la db ", event.target.error);
  };
};

export default ObtenerDatosDB;