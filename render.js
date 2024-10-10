
import { gamestate } from '/gamestate.js'
import { onClick } from '/onclick.js';
import { cards } from '/load.js'

export function renderGamestate(){
renderHand()
renderBoard()
console.log(gamestate)
mainScene()

}

function renderCard(card,index,container,zone){
    var clone = document.getElementById("clone").cloneNode(true);
    clone.id = "";
    clone.classList.add('CARD',cards[card].color,cards[card].type, "card"+cards[card].num,cards[card]["effect"]); // Optionally add a class for styling
    clone.onclick = function () {
            onClick(zone,index,clone)
    }
 
    if (cards[card].type == 'Lord'){
        let unitCost = cards[card].cost.split('')
        for (let i = 0; i < 2; i++){
           clone.querySelector('.soul-block').children[i].classList.add(unitCost[i])

        }
         
       
    }
    
    container.appendChild(clone); // Add the card to the hand container
}

function renderHand() {
    const container = document.getElementById('hand');
    var zone = "hand";
    container.innerHTML = ''; // Clear existing hand
    gamestate.hand.forEach((card,index) => {
        renderCard(card,index,container,zone)
    });

    
}

function renderBoard(){
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = ''; // Clear existing 
    for (let i = 0; i < 4; i++) {
        if (gamestate.board[i] > 0) {
            renderCard(gamestate.board[i],i,boardContainer,"board")
        
    }
    }
  
}

export function renderPile(zone){
    // * we only do this for deck/discard searches
    document.getElementById("enemyarea").style.display= "none"
    document.getElementById(zone).style.display = "flex"
    const container = document.getElementById(zone);
    container.innerHTML = ''; // Clear existing 
    if (gamestate[zone] == undefined) return;
    gamestate[zone].forEach((card,index) => {
                renderCard(card,index,container,zone)
    });
}

export function renderTargets(boardLocationID,list){
    if (list === undefined) {
        console.log("no valid targets");
        return; // Exit the function if the list is undefined
    }    const container = document.getElementById(boardLocationID);
    // Assuming container children represent hand positions
    const children = container.children;

    // Iterate through each child element
    for (let i = 0; i < children.length; i++) {
        // If the index is in the list, give the child element an ID of 'target'
        if (list.includes(i)) {
            children[i].id = 'target';
        }
    }



}

export function mainScene(){
     document.getElementById("enemyarea").style.display= "flex"
    document.getElementById("deck").style.display = "none"
    document.getElementById("discard").style.display = "none"

}

export function removeAllIds(containerId) {
    const container = document.getElementById(containerId);
    
    // Loop through all children of the container
    Array.from(container.children).forEach(child => {
        child.id = ''; // Remove the id by setting it to an empty string
    });
}