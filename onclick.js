import { gamestate } from '/gamestate.js'
import { renderGamestate } from "/render.js";
import { cards } from '/load.js'
import { renderPile } from "/render.js";
import { mainScene } from "/render.js";
import { readySouls } from "/render.js";
import { calcSacrifice } from "/render.js";


export function onClick(zone, index, element) {
    if (gamestate.agency == true && zone == 'hand') { // if you can play cards
        play("hand", index) // play the card from your hand position of index
        renderGamestate() //render
    } else if (gamestate.agency == false) { //if you can't play cards           
    }
}

    function play(zone, index) {
        const cardData = cards[gamestate[zone][index]]
        const emptySlotIndex = gamestate.board.findIndex(slot => slot.card === null);

        // If no empty slot is found, exit the function
        if (emptySlotIndex === -1) {
            console.log("No empty board slots available!");
            return;
        }
        if (cardData.type == "Lord" && calcSacrifice(readySouls(),cardData.cost.split('')) == false){
            console.log("missing souls")
            return;
        } else {
            // pickup
            // we need to rendertarget list that can pay for the first soul of the cost and then ad it to selection then do the second one
        }
        
        // Place the card in the empty slot
        gamestate.board[emptySlotIndex].card = gamestate[zone][index]; // Assign the card ID
        gamestate.board[emptySlotIndex].status = "charged"; // Update the status of the slot
        gamestate.board[emptySlotIndex].attached = []; 
        gamestate.board[emptySlotIndex].position = "back";
        gamestate.board[emptySlotIndex].ready = false; 


  
        
        // Remove the card from the original zone
        gamestate[zone].splice(index, 1);
        
        // Render the updated gamestate
        renderGamestate();
    }

    document.getElementById('deckpile').addEventListener('click', function () {

        renderPile('deck')
        if (document.getElementById('deck').style.display = "flex") {
            mainScene()
        }
    });


    document.getElementById('discardpile').addEventListener('click', function () {
        renderPile('discard')
    });
