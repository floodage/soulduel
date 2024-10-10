
import { gamestate } from '/gamestate.js'
var deck1 = [11, 11, 9, 9, 8, 5, 5, 4, 6, 7, 23, 33, 13, 19, 31, 32, 18, 35, 17, 16];
import { draw } from '/actions.js'
import { discard } from '/actions.js'
import { search } from '/actions.js';

import { chooseCard } from '/actions.js';
import { cardMove } from '/actions.js';
import { renderGamestate } from '/render.js';
import { mainScene } from '/render.js';
import { recover } from '/actions.js';

gamestate.deck = deck1;
document.getElementById('Deck1').addEventListener('click', function () {
    gamestate.deck = deck1;
});


document.getElementById('Draw').addEventListener('click', function () {
    draw(1);
});


document.getElementById('Mull').addEventListener('click', async function () {
    gamestate.agency = false;
    draw(3);

    await chooseCard("hand", 4);
    
});


document.getElementById('EndSelection').addEventListener('click', function () {
    let redraw = gamestate.selection.length;
    draw(redraw)
    cardMove("deck")
    console.log(gamestate.selection.length)
    gamestate.selection = [];
    renderGamestate()
    gamestate.agency = true;

});

document.getElementById('Discard1').addEventListener('click', function () {
    discard(1)


});


document.getElementById('Discard1red').addEventListener('click', function () {
    discard(1, { color: "red" })


});

document.getElementById('mainScene').addEventListener('click', function () {
    mainScene()
});


document.getElementById('searchDeck1').addEventListener('click', function() {
search(1,'hand')     
       
     });


     
document.getElementById('recover1').addEventListener('click', function() {
    recover(1,'hand')     
           
         });
         