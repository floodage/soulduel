import { gamestate } from '/gamestate.js'
import { renderGamestate } from "/render.js";
import {cards} from '/load.js'
import { renderPile } from "/render.js";

//checks
// is your turn
// has board space
// is soul
// 

export function onClick(zone,index,element) {
        if (gamestate.agency == true && zone == 'hand'){ // if you can play cards
            play("hand",index) // play the card from your hand position of index
            renderGamestate() //render
        } else if (gamestate.agency == false ){ //if you can't play cards
            console.log(zone);
            if (zone == 'deck' || zone == 'discard'){
                renderPile(location)
                var container = document.getElementById("searchbox");
               
    
            } else {
            container = document.getElementById(zone);

            }
      
            console.log(" click"+element.id)

            if(element.id == "target"){ //if you clicked a target
                console.log("target click"+element.id)
                gamestate.selection.push({ location: zone, position: index });
                gamestate.selection.sort((a, b) => b.position - a.position); //sort
                element.id= "targeted"
            document.dispatchEvent(new Event('cardSelected'));
           
        }
    }
}

export function onClickBoard(){
    renderGamestate()
}


function play(zone, index) {
    // Find the first empty slot on the board
    const emptySlot = gamestate.board.find(slot => slot.length === 0);

    // If no empty slot is found, exit the function
    if (!emptySlot) {
        console.log("No empty board slots available!");
        return;
    }

    // Place the card in the empty slot
    emptySlot.push(gamestate[zone][index]);

    // Remove the card from the original zone
    gamestate[zone].splice(index, 1);

    // Render the updated gamestate
    renderGamestate();
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
