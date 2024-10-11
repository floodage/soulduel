import { gamestate } from "/gamestate.js";
import { renderGamestate } from "/render.js";
import { renderTargets } from "/render.js";
import { mainScene } from "/render.js";
import { removeAllTargetClasses } from "/render.js";
import { renderPile } from "/render.js";
import { shuffleDeck } from "/render.js";
import { cardMove } from "/render.js";
import { chooseCard } from "/render.js";

import {cards} from '/load.js'


export function draw(x){
   shuffleDeck(gamestate.deck);
    
   // Loop to draw x cards
   for (let i = 0; i < x; i++) {
       if (gamestate.deck.length) {
        gamestate.selection.push({ location: 'deck', position: 0 });
          gamestate.selection.push() 
           cardMove("hand");
           gamestate.selection = [];
       } else {
           console.log("The deck is empty!");
           return false; // Stop drawing if the deck is empty
       }
   }
      renderGamestate();

}

export async function discard(location,qty,zone,condition){
    gamestate.agency=false;
    console.log(gamestate[location].length < qty)
    if (gamestate[location].length < qty) {
        return false;
    } else {
    await chooseCard(location,qty);
    cardMove("discard")

    gamestate.agency=true;
    gamestate.selection = [];
    renderGamestate()
    return true;
}
}

export async function recover(qty,zone,condition){
    if (gamestate.discard.length < qty){
        console.log("fail")

        return false;
    }
        gamestate.agency=false
        await chooseCard('discard',qty,condition)
        cardMove(zone)
        gamestate.selection = [];
        renderGamestate()
        gamestate.agency=true;
        mainScene()

}

export async function search(qty,zone,condition){
    if (gamestate.deck.length < qty){
        console.log("fail")

        return false;
    }
    gamestate.agency=false;
    await chooseCard('deck',qty,condition)
    cardMove(zone)
    gamestate.selection = [];
    renderGamestate()
    gamestate.agency=true;
    mainScene()


}

export async function attachCard(slot, qty,zone) {
    gamestate.agency = false;
    await chooseCard(zone,qty)
    // but it should be from the gamestate.selection
    
    gamestate.selection.forEach(selectedCard => {
        // Move the card from its current location to the desire location
        if (location == 'hand' && gamestate.hand.length == 5) return;
       
        gamestate.board[slot].attached.push(gamestate[selectedCard.location][selectedCard.position]);
        
        // Remove the card from its original location
        gamestate[selectedCard.location].splice(selectedCard.position, 1);
    });
    renderGamestate()
    gamestate.agency=true;
    mainScene()
}



    function stun(){

    }

    function hex(){

    }

    function ready(){

    }


    function swap(){

    }

    function avenge(color){

    }