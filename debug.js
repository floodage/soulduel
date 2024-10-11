
import { gamestate } from '/gamestate.js'
var deck1 = [11, 11, 9, 9, 8, 5, 5, 4, 6, 7, 23, 33, 13, 19, 31, 32, 18, 35, 17, 16];
import { draw } from '/actions.js'
import { discard } from '/actions.js'
import { search } from '/actions.js';
import { attachCard } from '/actions.js';

import { chooseCard } from '/render.js';
import { cardMove } from '/render.js';
import { renderGamestate } from '/render.js';
import { mainScene } from '/render.js';
import { recover } from '/actions.js';
import { cards } from '/load.js'
import { calcSacrifice } from '/render.js';


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



document.getElementById('mainScene').addEventListener('click', function () {
    mainScene()
});


document.getElementById('searchDeck1').addEventListener('click', function () {
    search(1, 'hand')

});

document.getElementById('Discard1').addEventListener('click', function () {
    discard('hand', 1)

});



document.getElementById('recover1').addEventListener('click', function () {
    recover(1, 'hand')

});

document.getElementById('attachhand1toboard1').addEventListener('click', function () {
    attachCard(1, 'hand')

});





document.getElementById('readyAll').addEventListener('click', async () => {
    // Loop through the board array
    for (let i = 0; i < gamestate.board.length; i++) {
        const slot = gamestate.board[i]; // Get each board slot
        
        // Check if a card is present (not null)
        if (slot.card !== null) {
            slot.ready = true; // Change status to "ready"
        }
    }
    
    // Optionally render the updated gamestate if needed
    renderGamestate(); // Assuming you have a function to re-render the gamestate
});


document.getElementById('unreadyAll').addEventListener('click', async () => {
    // Loop through the board array
    for (let i = 0; i < gamestate.board.length; i++) {
        const slot = gamestate.board[i]; // Get each board slot
        
        // Check if a card is present (not null)
        if (slot.card !== null) {
            slot.ready = false; // Change status to "ready"
        }
    }
    
    // Optionally render the updated gamestate if needed
    renderGamestate(); // Assuming you have a function to re-render the gamestate
});

document.getElementById('example').addEventListener('click', async () => {

 });