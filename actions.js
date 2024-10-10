import { gamestate } from "/gamestate.js";
import { renderGamestate } from "/render.js";
import { renderTargets } from "/render.js";
import { mainScene } from "/render.js";
import { removeAllIds } from "/render.js";
import { renderPile } from "/render.js";

import {cards} from '/load.js'

export async function discard(qty,condition){
    gamestate.agency=false;
    await chooseCard("hand",qty);
    cardMove("discard")
    gamestate.agency=true;
    gamestate.selection = [];
    renderGamestate()
}
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



export function cardMove(location){
    //this is from gamestate.selection
    gamestate.selection.forEach(selectedCard => {
        // Move the card from its current location to the desire location
        if (location == 'hand' && gamestate.hand.length == 5) return;
       
        gamestate[location].push(gamestate[selectedCard.location][selectedCard.position]);
        
        // Remove the card from its original location
        gamestate[selectedCard.location].splice(selectedCard.position, 1);
    });

}

export function calcTargets(location, qty, condition){
    const list = Array.from(gamestate[location].keys()) 
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
        if (location == "deck"||location =="discard") {renderPile(location)}
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