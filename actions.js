import { gamestate } from "/gamestate.js";
import { renderGamestate } from "/render.js";
import { renderTargets } from "/render.js";
import { mainScene } from "/render.js";
import { removeAllIds } from "/render.js";
import { renderPile } from "/render.js";

import {cards} from '/load.js'

export async function discard(qty,condition){
    gamestate.agency=false;
    await chooseCard("hand",1,condition);
    cardMove("discard")
    gamestate.agency=true;
    gamestate.selection = [];
    renderGamestate()
}
export function draw(x){
   // Shuffle the deck before drawing
   shuffleDeck(gamestate.deck);
    
   // Loop to draw x cards
   for (let i = 0; i < x; i++) {
       if (gamestate.deck.length) {
           // Move the top card from the deck to the hand
           cardToHand(gamestate.deck.shift());
       } else {
           console.log("The deck is empty!");
           break; // Stop drawing if the deck is empty
       }
   }
      renderGamestate();
}



export async function search(qty,zone,condition){
    
    gamestate.agency=false;
    await chooseCard('deck',qty,condition)
    cardMove(zone)
    gamestate.selection = [];
    renderGamestate()
    gamestate.agency=true;
    mainScene()


}

export async function recover(qty,zone,condition){
    gamestate.agency=false
    await chooseCard('discard',qty,condition)
    cardMove(zone)
    gamestate.selection = [];
    renderGamestate()
    gamestate.agency=true;
    mainScene()
}


function cardToHand(card){
    if(gamestate.hand.length != 5) gamestate.hand.push(card)
    else gamestate.deck.push(card)
    renderGamestate()

}
export function cardMove(location){
    //this is from gamestate.selection
    gamestate.selection.forEach(selectedCard => {
        // Move the card from its current location to the deck
        gamestate[location].push(gamestate[selectedCard.location][selectedCard.position]);
        
        // Remove the card from its original location
        gamestate[selectedCard.location].splice(selectedCard.position, 1);
    });

}

export function calcTargets(location, qty, condition){
    const list = Array.from(gamestate[location].keys()) 
    console.log("calcTargets " +list)
    console.log(list)
    // if there is no condition all cards in the zone can be selected
    if (condition === undefined) return list;
    const matchingIndices = []; // List to store matching indices
    let key = Object.keys(condition)[0]
    let value = condition[Object.keys(condition)[0]]
    // Loop through the cards in the specified location
    for (let i = 0; i < gamestate[location].length; i++) {
        // Check if the card color matches the condition
        if (cards[gamestate[location][i]][key] == value) {
            matchingIndices.push(i); // Add index to the list if it matches
        }

        if (matchingIndices.length == 0){
            console.log("missing conditions")
            return undefined
        }
    }

    return matchingIndices; // Return the list of matching indices
}



    export async function chooseCard(location, qty, condition) {
        console.log(" chooseCard")
        if (location == 'deck' || location == 'discard'){
            renderPile(location)
            location == 'searchbox'

        }
            renderTargets(location, calcTargets(location, qty, condition));
            return new Promise((resolve) => {
                 function selectionHandler() {
                    if (gamestate.selection.length==qty || gamestate.agency==true ) {
                        document.removeEventListener('cardSelected', selectionHandler);
                        removeAllIds(location);
                        resolve();
                    }
                }      
                document.addEventListener('cardSelected', selectionHandler);
            });
        
    }


    export function shuffleDeck(x){
        for (let i = x.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [x[i], x[j]] = [x[j], x[i]]; 
        }
        return x;
        
    }