import Movimientos from "../Clases/Movimientos.js";

const obtMovimientos = (dtMovimientos) => {
  if (!Array.isArray(dtMovimientos)) return [];
  const gestorMovimientos = new Movimientos(dtMovimientos);
  return gestorMovimientos.Moves();
};

export default obtMovimientos;
