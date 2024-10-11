
import { gamestate } from '/gamestate.js'
import { onClick } from '/onclick.js';
import { cards } from '/load.js'

export function renderGamestate() {
    renderHand()
    renderBoard()
    console.log(gamestate)
    mainScene()

}

function renderCard(card, index, container, zone) {
    var clone = document.getElementById("clone").cloneNode(true);
    clone.id = "";
    clone.classList.add('CARD', cards[card].color, cards[card].type, "card" + cards[card].num, cards[card]["effect"]); // Optionally add a class for styling
    clone.onclick = function () {
        onClick(zone, index, clone)
    }

    if (cards[card].type == 'Lord') {
        let unitCost = cards[card].cost.split('')
        for (let i = 0; i < 2; i++) {
            clone.querySelector('.soul-block').children[i].classList.add(unitCost[i])

        }


    }

   

    container.appendChild(clone); // Add the card to the hand container

   
    return clone;
}


function renderHand() {
    const container = document.getElementById('hand');
    var zone = "hand";
    container.innerHTML = ''; // Clear existing hand
    gamestate.hand.forEach((card, index) => {
        renderCard(card, index, container, zone)
    });
    calcPlays()
}

function renderBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = ''; // Clear existing 
    let boardSlots = [];
    for (let i = 0; i < 4; i++) {
        if (gamestate.board[i].card !== null) {
            boardSlots[i] = document.createElement("div")
            boardSlots[i].className = "board"+i

            boardContainer.appendChild(boardSlots[i])
            
            console.log(gamestate.board[i].attached)
            if (gamestate.board[i].attached.length > 0){
                const board1 = document.createElement("div")
                    board1.className = "board1";
                    console.log(parent,board1)
                for (let x = 0; x < gamestate.board[i].attached.length; x++){
                    

                    
                    console.log("TEST")
                    console.log(gamestate.board[i].attached)
                    renderCard(gamestate.board[i].attached[x],1,boardSlots[i],'board1')
                }
                
            }
            renderCard(gamestate.board[i].card, i, boardSlots[i], "board")
            
        }
    }
}

export function renderPile(zone) {
    // * we only do this for deck/discard searches
    document.getElementById("enemyarea").style.display = "none"
    document.getElementById(zone).style.display = "flex"
    const container = document.getElementById(zone);
    container.innerHTML = ''; // Clear existing 
    if (gamestate[zone] == undefined) return;
    gamestate[zone].forEach((card, index) => {
        renderCard(card, index, container, zone)
    });
}

export function renderTargets(zone, list) {
    if (list.length === 0) {
        console.log("no valid targets");
        return; // Exit the function if the list is undefined
    } const container = document.getElementById(zone);
    // Assuming container children represent hand positions
    const children = container.children;

    // Iterate through each child element
    for (let i = 0; i < children.length; i++) {
        // If the index is in the list, give the child element an ID of 'target'
        if (list.includes(i)) {
            children[i].classList.add('target');
        }
    }

    document.querySelectorAll('.target').forEach(element => {
        element.addEventListener('click', function() {
            if (this.parentNode == null) return;
            const parent = this.parentNode; // Get the parent element
            const children = Array.from(parent.children); // Convert the children to an array
            const index = children.indexOf(this); // Find the index of this element

            gamestate.selection.push({ location: this.parentNode.id, position: index });
            gamestate.selection.sort((a, b) => b.position - a.position); //sort
            this.classList.add("targeted");
            this.classList.remove("target");

            document.dispatchEvent(new Event('cardSelected'));
        });
    });

}

export function mainScene() {
    document.getElementById("enemyarea").style.display = "flex"
    document.getElementById("deck").style.display = "none"
    document.getElementById("discard").style.display = "none"
}

export function removeAllTargetClasses(containerId) {
    const container = document.getElementById(containerId);

    // Loop through all children of the container
    Array.from(container.children).forEach(child => {
        child.classList.remove('target'); // Remove the 'target' class from each child
    });
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

export function readySouls(){
    let readySouls = []
    for (let i = 0; i < gamestate.board.length; i++) {
     const slot = gamestate.board[i]; // Get each board slot
     
     // Check if a card is present (not null)
     if (slot.card !== null) {
         if (slot.ready == true || slot.status == "stunned" ) {
             readySouls.push(cards[slot.card].color.charAt(0))
 
         }
     }
 }
 return readySouls;
}

export function calcSacrifice(soulpool, cost){
    let pool = [...soulpool]; // Copy the soulpool to avoid modifying the original
  let wildcards = 0;        // Count of wildcards 'w'

  // Count how many wildcards are in the cost array
  for (let element of cost) {
    if (element === 'w') {
      wildcards++;
    }
  }

  if (wildcards === cost.length) {
    // If all costs are wildcards, check if the soulpool has at least one element
    return pool.length > 0;
  }

  for (let element of cost) {
    if (element === 'w') {
      // If it's a wildcard, we can use it but need at least one in soulpool
      if (pool.length === 0) {
        return false; // No valid elements in soulpool
      }
      continue;
    }

    const index = pool.indexOf(element);
    
    if (index !== -1) {
      // If the element is found in the pool, remove it
      pool.splice(index, 1);
    } else if (wildcards > 0) {
      // If it's not in the pool, use a wildcard if available
      wildcards--;
    } else {
      // If neither the element nor a wildcard is available, return false
      return false;
    }
  }
  
  // All elements in the cost were satisfied
  return true;

}
  
  


function calcPlays(){
    const list = []

    for (let i =0; i < gamestate.hand.length; i++){
        if (cards[gamestate.hand[i]].type == "Lord"){
            if (calcSacrifice(readySouls(),cards[gamestate.hand[i]].cost.split(''))){
                list.push(i)
            }
        }
    }


    if (gamestate.board.findIndex(slot => slot.card === null)=== -1){
        console.log("no plays")
        return false;
    } 
    for (let i =0; i < gamestate.hand.length; i++){
        if (cards[gamestate.hand[i]].type == "Soul"){
            list.push(i)
        }
    }
renderTargets("hand",list)
    
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
                        removeAllTargetClasses(location);
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
