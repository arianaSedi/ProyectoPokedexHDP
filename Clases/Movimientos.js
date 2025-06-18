// Clase para gestionar los movimientos del Pokémon
class Movimientos{
    constructor(movesData) {
        this.movesData = movesData;
    }

    // Método para obtener los primeros movimientos en inglés (cantidad = 5, solo 5 movimientos de cada pokemon mostrara)
    Moves(cantidad = 5) {
        const primerosMovimientos = [];

        for (let i = 0; i < this.movesData.length && primerosMovimientos.length < cantidad; i++) {
            const movimiento = this.movesData[i].move;

            if (movimiento && typeof movimiento.name === "string") {
                primerosMovimientos.push(movimiento.name.replace("-", " "));
            }
        }

        return primerosMovimientos;
    }
}

// Exportar la clase para que pueda ser usada en otros archivos
export default Movimientos;
