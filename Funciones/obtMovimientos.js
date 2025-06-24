// Importar la clase desde el archivo correspondiente
import Movimientos from "../Clases/Movimientos.js";

// Función para usar la clase y obtener los primeros movimientos
const obtMovimientos = (dtMovimientos) => {
    const gestorMovimientos = new Movimientos(dtMovimientos);
    return gestorMovimientos.Moves();
};

// Exportar la función
export default obtMovimientos;