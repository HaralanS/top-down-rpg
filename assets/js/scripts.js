import Warrior from "./Warrior.js";
import { map01 } from "./maps.js";

const hero = new Warrior();

const mapa01 = map01;

let charPositionX = 7;
let charPositionY = 7;
let mapPositionX = 256;
let mapPositionY = 256;
let action = 1;
let moveCooldown = false;
let onMap = true;
const frontImg = "../img/char-01-Sheet-export.png";
const backImg = "../img/char-back-Sheet-export.png";

const screen = document.querySelector(".screen");
const mapa01Div = document.querySelector(".mapa01");
const charDiv = document.querySelector(".char");

const actionButton = document.querySelector(".action-button")
const upButton = document.querySelector(".up-button")
const downButton = document.querySelector(".down-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const inventoryButton = document.querySelector(".backpack-button")
const closeInventoryButton = document.querySelector(".close-inventory-button")
const statsButton = document.querySelector(".stats-button")
const closePlayerStatsButton = document.querySelector(".close-player-stats-button")

const playerStatsSection = document.querySelector(".player-stats-section")
const inventorySection = document.querySelector(".inventory")

const inventoryMessageBox = document.querySelector(".inventory-message-box")


upButton.addEventListener("click", () => {
    goUp()
}
);
downButton.addEventListener("click", () => {
    goDown()
}
);
leftButton.addEventListener("click", () => {
    goLeft()
}
);
rightButton.addEventListener("click", () => {
    goRight()
}
);
actionButton.addEventListener("click", () => {
    takeAction()
}
);
inventoryButton.addEventListener("click", () => {
    openInventory()
}
);
closeInventoryButton.addEventListener("click", () => {
    closePopUp()
}
);
closePlayerStatsButton.addEventListener("click", () => {
    closePopUp()
}
);
statsButton.addEventListener("click", () => {
    openPlayerStats()
}
);


const setMap = () => {
    mapa01Div.innerText = "";
    for (let i = 0; i < mapa01.length; i++) {
        for (let j = 0; j < mapa01[i].length; j++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            if(mapa01[i][j] == 0) {
                tile.classList.add("wall");
            }
            if(mapa01[i][j] == 1) {
                // const random = Math.random() * 10;
                // if(random < 5) {
                //     tile.classList.add("grass");
                // } else {
                //     tile.classList.add("grass2");
                // }
                tile.classList.add("grass");
                
            }
            if(mapa01[i][j] == 2) {
                tile.classList.add("center");
            }
            if(mapa01[i][j] == 3) {
                tile.classList.add("door");
            }
            mapa01Div.appendChild(tile)
        }
        
    }
}
setMap()


document.addEventListener("keydown", function(e){
    if(onMap) {
        if(e.key == "ArrowDown"){
            goDown()
            
        } else if(e.key == "ArrowUp"){
            goUp()
            
        } else if(e.key == "ArrowLeft"){
            goLeft()
            
        } else if(e.key == "ArrowRight"){
            goRight()
            
        } else if(e.key == "i"){
            openInventory()
            
        }
    }
    
    
})

const goUp = () => {
    
    if(mapa01[charPositionY - 1][charPositionX] == 1 && !moveCooldown) { 
        moveCooldown = true;       
        charPositionY -= 1;
        mapPositionY -= 64;
        mapa01Div.style.bottom = `${mapPositionY}px`;
        charDiv.classList.remove("front", "left", "right")
        charDiv.classList.add("back")
        charDiv.setAttribute("style", "background-position: -64px;")
        upButton.setAttribute("style", "opacity: 1;")
        setTimeout(()=>{
            charDiv.setAttribute("style", "background-position: -128px;")
            setTimeout(()=>{
                charDiv.setAttribute("style", "background-position: 0px;")
                upButton.removeAttribute("style")
                moveCooldown = false;
            }, 200)
        }, 200)
    }
    checkAction()
}
const goDown = () => {
    if(mapa01[charPositionY + 1][charPositionX] == 1 && !moveCooldown) {
        moveCooldown = true;
        charPositionY += 1;
        mapPositionY += 64;
        mapa01Div.style.bottom = `${mapPositionY}px`;
        charDiv.classList.remove("back", "left", "right")
        charDiv.classList.add("front")
        charDiv.setAttribute("style", "background-position: -64px;")
        downButton.setAttribute("style", "opacity: 1;")
        setTimeout(()=>{
            charDiv.setAttribute("style", "background-position: -128px;")
            setTimeout(()=>{
                charDiv.setAttribute("style", "background-position: 0px;")
                downButton.removeAttribute("style")
                moveCooldown = false;
            }, 200)
        }, 200)
        
        
    } 
    checkAction()
}
const goLeft = () => {
    
    if(mapa01[charPositionY][charPositionX - 1] == 1 && !moveCooldown) {  
        moveCooldown = true;      
        charPositionX -= 1;
        mapPositionX -= 64;
        mapa01Div.style.right = `${mapPositionX}px`;
        charDiv.classList.remove("back", "front", "right")
        charDiv.classList.add("left")
        charDiv.setAttribute("style", "background-position: -64px;")
        leftButton.setAttribute("style", "opacity: 1;")
        setTimeout(()=>{
            charDiv.setAttribute("style", "background-position: -128px;")
            setTimeout(()=>{
                charDiv.setAttribute("style", "background-position: 0px;")
                leftButton.removeAttribute("style")
                moveCooldown = false;
            }, 200)
        }, 200)
        
    }
    checkAction()
}
const goRight = () => {
    
    if(mapa01[charPositionY][charPositionX + 1] == 1 && !moveCooldown) {  
        moveCooldown = true;      
        charPositionX += 1;
        mapPositionX += 64;
        mapa01Div.style.right = `${mapPositionX}px`;
        charDiv.classList.remove("back", "left", "front")
        charDiv.classList.add("right")
        charDiv.setAttribute("style", "background-position: -64px;")
        rightButton.setAttribute("style", "opacity: 1;")
        setTimeout(()=>{
            charDiv.setAttribute("style", "background-position: -128px;")
            setTimeout(()=>{
                charDiv.setAttribute("style", "background-position: 0px;")
                rightButton.removeAttribute("style")
                moveCooldown = false;
            }, 200)
        }, 200)
        
    }
    checkAction()
}
const openDoor =()=>{
    mapa01[4][2] = mapa01[4][2] == 3 ? 1 : 3;

    setMap()
}
const takeAction = () => {
    if(action == 2) {
        // actionButton.innerHTML = actionButton.innerHTML == "Open" ? "Close" : "Open";
        openDoor()
    }
}
const checkAction = () => {

    if(charPositionX == 7 && charPositionY == 7) {
        action = 1;
        // actionButton.setAttribute("style", "background: white; cursor: pointer")
    } else if(charPositionX == 2 && charPositionY == 5 || charPositionX == 2 && charPositionY == 3) {
        action = 2;
        actionButton.innerHTML = "Open/Close";
        actionButton.setAttribute("style", "background: white; cursor: pointer")
    } else {
        action = 0;
        actionButton.setAttribute("style", "background: none; cursor: auto")
        actionButton.innerHTML = ""
    }
}
const openPlayerStats = () => {
    onMap=false;
    playerStatsSection.setAttribute("style", "display: flex;")
}
const openInventory = () => {
    onMap=false;
    inventoryMessageBox.innerHTML = hero.name;
    inventorySection.setAttribute("style", "display: flex;")
}
const closePopUp = () => {
    onMap=true;
    playerStatsSection.setAttribute("style", "display: none;")
    inventorySection.setAttribute("style", "display: none;")
}
checkAction()


// export default {goDown, goUp}