import { gamestate } from '/gamestate.js'
import { renderGamestate } from "/render.js";
import {cards} from '/load.js'
import { renderPile } from "/render.js";

//checks
// is your turn
// has board space
// is soul
// 

export function onClick(locationID,index) {
        if (gamestate.agency == true && locationID == 'hand'){ // if you can play cards
            play(gamestate.hand,index) // play the card from your hand position of index
            renderGamestate() //render
        } else if (gamestate.agency == false ){ //if you can't play cards
            const container = document.getElementById(locationID);
             container.children;
             
            if(container.children[index].id == "target"){ //if you clicked a target
                if(locationID=='searchbox') {locationID='deck'}
                gamestate.selection.push({ location: locationID, position: index });
                gamestate.selection.sort((a, b) => b.position - a.position); //sort
                container.children[index].id= "targeted"
            document.dispatchEvent(new Event('cardSelected'));
           
        }
    }
        
    
        
    
}

export function onClickBoard(){

    
    renderGamestate()

}


function play(fromGamestate,index){  
    console.log(gamestate,fromGamestate[index])
    
   
    for (let i = 0; i < gamestate.board.length; i++) {
        if (gamestate.board[i].length === 0) {  // Check if the list is empty
            gamestate.board[i] = [fromGamestate[index]];  // Assign a new list starting with the value
            break;
        }
    }
    fromGamestate.splice(index);

    renderGamestate()
}
document.getElementById('deck').addEventListener('click', function() {
    console.log("deck clicked")
    document.getElementById("enemyarea").style.display= "none"
    const searchbox = document.getElementById("searchbox").style.display = "flex"
    renderPile('deck')
    });


document.getElementById('discard').addEventListener('click', function() {
        console.log("discard clicked")
        renderPile('discard')
        });
