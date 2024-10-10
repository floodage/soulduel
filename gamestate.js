
import { renderGamestate } from "/render.js";
export var gamestate = {

  deck: [],
  hand: [],
  discard: [],
  board: [
    [],
    [],
    [],
    [],

  ],
  agency: true,
  selection: [],
}


document.getElementById('testGamestate').addEventListener('click', function () {
  gamestate = {

    deck: [1, 4, 7, 4, 3, 7, 9, 10, 20, 30],
    hand: [8, 1, 19, 30],
    discard: [2, 4],
    board: [
      [32],
      [5],
      [6],
      [],

    ],
    agency: true,
    selection: [],
  }
  renderGamestate();
});

