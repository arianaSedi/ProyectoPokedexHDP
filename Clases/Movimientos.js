class Movimientos {
  constructor(movesData) {
    this.movesData = [];

    if (Array.isArray(movesData)) {
      for (let i = 0; i < movesData.length && this.movesData.length < 5; i++) {
        const mov = movesData[i];
        if (typeof mov === "string") {
          this.movesData.push(mov);
        } else if (mov?.move?.name) {
          this.movesData.push(mov.move.name.replace("-", " "));
        } else if (typeof mov.name === "string") {
          this.movesData.push(mov.name.replace("-", " "));
        }
      }
    }
  }

  Moves() {
    return this.movesData;
  }

  toJSON() {
    return this.movesData;
  }
}

export default Movimientos;
