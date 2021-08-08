const columnas = document.getElementsByClassName("columna");
const tablero = [
  document.getElementsByClassName("uno"),
  document.getElementsByClassName("dos"),
  document.getElementsByClassName("tres"),
  document.getElementsByClassName("cuatro"),
  document.getElementsByClassName("cinco"),
  document.getElementsByClassName("seis"),
];
const botonReset = document.getElementById("reset");
let tableroFichas = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

let turno = 1;
let ganador = false;

const iniciarJuego = () => {
  for (let i = 0; i < columnas.length; i++) {
    columnas[i].addEventListener("click", añadirFicha);
  }
  botonReset.addEventListener("click", resetJuego);
};

const añadirFicha = (evento) => {
  let columnaIndex = evento.target.id - 1;
  let filaIndex = 5;
  let fichaColocada = false;

  if (ganador) return;

  while (fichaColocada == false && filaIndex > -1) {
    let espacioTablero = tablero[filaIndex][columnaIndex];

    if (espacioTablero.espacioOcupado) {
      filaIndex -= 1;
    } else {
      if (turno === 1) {
        espacioTablero.classList.add("rojo");
        espacioTablero.espacioOcupado = true;
        fichaColocada = true;
        tableroFichas[filaIndex][columnaIndex] = 1;
      } else if (turno === 2) {
        espacioTablero.classList.add("amarillo");
        espacioTablero.espacioOcupado = true;
        fichaColocada = true;
        tableroFichas[filaIndex][columnaIndex] = 2;
      }
      tablero[filaIndex][columnaIndex] = espacioTablero;
    }
  }
  let pasaTurno = true;
  if (filaIndex === -1) {
    filaIndex = 0;
    pasaTurno = false;
  }

  checkGanador(columnaIndex, filaIndex, pasaTurno);
};

const checkGanador = (ultimaColumna, ultimaFila, pasaTurno) => {
  let combo = 0;
  let posicionCombo = [];

  // Chequear toda la fila
  for (let i = 0; i < tablero[0].length; i++) {
    if (tableroFichas[ultimaFila][i] === turno) {
      combo++;
      posicionCombo.push([ultimaFila, i]);
    } else if (combo < 4) {
      combo = 0;
      posicionCombo = [];
    }
  }

  // Medida de seguridad obligatoria
  if (combo < 4) {
    combo = 0;
    posicionCombo = [];
  }

  // Chequear toda la columna
  for (let i = 0; i < tablero.length; i++) {
    if (tableroFichas[i][ultimaColumna] === turno) {
      combo++;
      posicionCombo.push([i, ultimaColumna]);
    } else if (combo < 4) {
      combo = 0;
      posicionCombo = [];
    }
  }

  // Medida de seguridad obligatoria
  if (combo < 4) {
    combo = 0;
    posicionCombo = [];
  }

  // Encontrar punto inicial
  let rango = true;
  let startPos = [];
  let i = 0;
  while (rango) {
    startPos = [ultimaFila + i - 1, ultimaColumna - i + 1];
    rango = ultimaFila + i <= 5 && ultimaColumna - i >= 0;
    i++;
  }

  // Chequear desde el punto inicial la diagonal positiva
  rango = true;
  i = 0;
  while (rango) {
    if (tableroFichas[startPos[0] - i][startPos[1] + i] === turno) {
      combo++;
      posicionCombo.push([startPos[0] - i, startPos[1] + i]);
    } else if (combo < 4) {
      combo = 0;
      posicionCombo = [];
    }
    rango = startPos[0] - i > 0 && startPos[1] + i <= 6;
    i++;
  }

  // Medida de seguridad obligatoria
  if (combo < 4) {
    combo = 0;
    posicionCombo = [];
  }

  // Encontrar punto inicial
  rango = true;
  startPos = [];
  i = 0;
  while (rango) {
    startPos = [ultimaFila + i - 1, ultimaColumna + i - 1];
    rango = ultimaFila + i <= 5 && ultimaColumna + i >= 0;
    i++;
  }

  // Chequear desde el punto inicial la diagonal negativa
  rango = true;
  i = 0;
  while (rango) {
    if (tableroFichas[startPos[0] - i][startPos[1] - i] === turno) {
      combo++;
      posicionCombo.push([startPos[0] - i, startPos[1] - i]);
    } else if (combo < 4) {
      combo = 0;
      posicionCombo = [];
    }
    rango = startPos[0] - i > 0 && startPos[1] - i > 0;
    i++;
  }

  // Verificar ganador
  if (combo >= 4) {
    ganador = true;
    for (let i = 0; i < posicionCombo.length; i++) {
      const pos = posicionCombo[i];

      tablero[pos[0]][pos[1]].classList.add("destacar");
    }
  }

  if (pasaTurno === false || ganador === true) return;
  else if (turno === 1) {
    turno = 2;
    for (let i = 0; i < columnas.length; i++) {
      columnas[i].classList.remove("rojo");
      columnas[i].classList.add("amarillo");
    }
  } else if (turno === 2) {
    for (let i = 0; i < columnas.length; i++) {
      columnas[i].classList.remove("amarillo");
      columnas[i].classList.add("rojo");
    }
    turno = 1;
  }
};

const resetJuego = () => {
  tableroFichas = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  turno = 1;
  ganador = false;

  for (let i = 0; i < tablero.length; i++) {
    for (let ii = 0; ii < tablero[i].length; ii++) {
      tablero[i][ii].classList.remove("rojo");
      tablero[i][ii].classList.remove("amarillo");
      tablero[i][ii].classList.remove("destacar");
      tablero[i][ii].espacioOcupado = false;
    }
  }
};

document.addEventListener("DOMContentLoaded", iniciarJuego);
