import Movimientos from "../Clases/Movimientos.js";

const obtMovimientos = (dtMovimientos) => {
  const gestor = new Movimientos(dtMovimientos);
  return gestor;
};

export default obtMovimientos;
