
import { gamestate } from '/gamestate.js'
import { onClick } from '/onclick.js';
import { onClickBoard } from '/onclick.js';
import { cards } from '/load.js'

export function renderGamestate(){
renderHand()
renderBoard()
console.log(gamestate)
}

function renderCard(){

}

function renderHand() {
    const handContainer = document.getElementById('hand');
    handContainer.innerHTML = ''; // Clear existing hand
    gamestate.hand.forEach((card,index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('CARD',cards[card].color); // Optionally add a class for styling
        cardDiv.onclick = function () {
            
                
                onClick(handContainer.id,index)
            
            
        }
        cardDiv.textContent = card; // Set the card name as text
        handContainer.appendChild(cardDiv); // Add the card to the hand container
    });
}

function renderBoard(){
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = ''; // Clear existing 
    for (let i = 0; i < 4; i++) {
        if (gamestate.board[i].length > 0) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('CARD'); // Optionally add a class for styling
        cardDiv.onclick = function () {
            onClickBoard(gamestate.board[i])
        }
        cardDiv.textContent = gamestate.board[i]; // Set the card name as text
        boardContainer.appendChild(cardDiv); // Add the card to the hand container
    }
    }
  
}

export function renderPile(location){
    document.getElementById("enemyarea").style.display= "none"
    document.getElementById('searchbox').style.display = "flex";
    const searchbox = document.getElementById('searchbox');
    searchbox.innerHTML = ''; // Clear existing 
    gamestate[location].forEach((card,index) => {
                //render function

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('CARD',cards[card].color); // Optionally add a class for styling
        cardDiv.onclick = function () {
            console.log("CLICKED")
            onClick("searchbox",index)
        }
        cardDiv.textContent = card; // Set the card name as text
        searchbox.appendChild(cardDiv); // Add the card to the hand container
    });
}

export function renderTargets(boardLocationID,list){
    if (boardLocationID == 'deck') {boardLocationID = 'searchbox';}
    console.log("renderTargets "+boardLocationID)
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
    const searchbox = document.getElementById("searchbox").style.display = "none"
}

export function removeAllIds(containerId) {
    const container = document.getElementById(containerId);
    
    // Loop through all children of the container
    Array.from(container.children).forEach(child => {
        child.id = ''; // Remove the id by setting it to an empty string
    });
}