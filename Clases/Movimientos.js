// Clase para gestionar los movimientos del Pokémon
class Movimientos {
  constructor(movesData) {
    // Si movesData no es un arreglo válido, usar un arreglo vacío
    this.movesData = Array.isArray(movesData) ? movesData : [];
  }

  // Método para obtener los primeros movimientos en inglés
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

export default Movimientos;
