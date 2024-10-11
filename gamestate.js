
import { renderGamestate } from "/render.js";
export var gamestate = {

  deck: [],
  hand: [],
  discard: [],
  board: [
    {
      "card": null,
      "status": null,
      "position": null,
      "ready":null,
      "attached": []
    },
    {
     "card": null,
      "status": null,
      "position": null,
      "ready":null,
      "attached": []
    },
    {
     "card": null,
      "status": null,
      "position": null,
      "ready":null,
      "attached": []
    },
    {
    "card": null,
      "status": null,
      "position": null,
      "ready": null,
      "attached": []
    }

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
      {
        "card": 32,
        "status": 'charged',
        "position": 'back',
        "ready": 'false',
        "attached": [1,3]
      },
      {
       "card": 3,
        "status": null,
        "position": null,
        "ready":null,
        "attached": []
      },
      {
       "card": null,
        "status": null,
        "position": null,
        "ready":null,
        "attached": []
      },
      {
      "card": null,
        "status": null,
        "position": null,
        "ready": null,
        "attached": []
      }

    ],
    agency: true,
    selection: [],
  }
  renderGamestate();
});

