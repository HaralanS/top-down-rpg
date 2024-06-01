import Warrior from "./player-classes.js";
import { SmallPowerRing, SmallRingOfEndurance } from "./item-classes/rings.js";
import { SmallProtectionAmulet } from "./item-classes/trinkets.js";
import { BattleAxe, SteelSword } from "./item-classes/weapons.js";
import { map01 } from "./maps.js";
import { SmallHealthPotion, SmallManaPotion } from "./item-classes/potions.js";
import { RedApple } from "./item-classes/food.js";
import { Strike } from "./skills.js";
import { Goblin } from "./monsters.js";


const hero = new Warrior();
hero.inventory.push(new SmallRingOfEndurance())
hero.inventory.push(new SmallProtectionAmulet())
hero.inventory.push(new SteelSword())
hero.inventory.push(new BattleAxe())
hero.inventory.push(new SmallHealthPotion())
hero.inventory.push(new SmallManaPotion())


const mapa01 = map01;

let charPositionX = 7;
let charPositionY = 7;
let mapPositionX = 256;
let mapPositionY = 256;
let action = 1;
let moveCooldown = false;
let onMap = true;
let selectedItem = 0;
let selectedSkill = "none";
let monster;
const experienceList = hero.experienceList;


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
const skillsBox = document.querySelector(".skills-box")
const skillsToLearnBox = document.querySelector(".skills-to-learn-box")
const statsMessage = document.querySelector(".stats-message")
const skillSetButton = document.querySelector(".skill-set-button")

const weaponBox = document.querySelector(".weapon-box")
const armorBox = document.querySelector(".armor-box")
const trinketBox = document.querySelector(".trinket-box")
const ringBox = document.querySelector(".ring-box")

const playerStatsSection = document.querySelector(".player-stats-section")
const inventorySection = document.querySelector(".inventory")

const inventoryMessageBox = document.querySelector(".inventory-message-box")
const backpackBox = document.querySelector(".backpack-box")
const inventoryActionButton = document.querySelector(".inventory-action-button")

const battleScreen = document.querySelector(".battle-screen")
const battleTitle = document.querySelector(".battle-title")

const battleMessage = document.querySelector(".battle-messages")
const heroLifeBarText = document.querySelector(".hero-life-bar-text")
const heroManaBarText = document.querySelector(".hero-mana-bar-text")
const monsterLifeBarText = document.querySelector(".monster-life-bar-text")
const heroImgBox = document.querySelector(".hero-img-box")
const monsterImgBox = document.querySelector(".monster-img-box")
const heroLifeBar = document.querySelector(".hero-life-bar")
const heroManaBar = document.querySelector(".hero-mana-bar")
const monsterLifeBar = document.querySelector(".monster-life-bar")


hero.setEquippmentStats()

inventoryActionButton.addEventListener("click", () => {
    if(hero.inventory[selectedItem].action == "equip"){
        equipItem()
    } else if(hero.inventory[selectedItem].action == "drink"){
        hero.inventory[selectedItem].drink(hero)
        setInventoryStats()
    } else if(hero.inventory[selectedItem].action == "eat"){
        hero.inventory[selectedItem].eat(hero)
        setInventoryStats()
    }
    
})

skillSetButton.addEventListener("click", () => {
    if(selectedSkill != "none") {
        setSkill()
    }
})
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
            if(mapa01[i][j] == 4) {
                tile.classList.add("seller-01");
            }
            if(mapa01[i][j] == 5) {
                tile.classList.add("battle-tile");
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
const checkWalkableTile = (direction) => {
    if(direction == "up") {
        return (mapa01[charPositionY - 1][charPositionX] == 1 || mapa01[charPositionY - 1][charPositionX] == 5)  && !moveCooldown
    }
    
}
const goUp = () => {
    if(checkWalkableTile("up")) { 
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
    } else if(mapa01[charPositionY-1][charPositionX] == 4) {
        action = 3;
        actionButton.innerHTML = "Buy/Sell";
        actionButton.setAttribute("style", "background: white; cursor: pointer")
    } else if(mapa01[charPositionY][charPositionX] == 5) {
        console.log("to aqui")
        openBattle(new Goblin())
        // actionButton.innerHTML = "Buy/Sell";
        // actionButton.setAttribute("style", "background: white; cursor: pointer")
    } else {
        action = 0;
        actionButton.setAttribute("style", "background: none; cursor: auto")
        actionButton.innerHTML = ""
    }
}
const openPlayerStats = () => {
    onMap=false;
    setPlayerStats()
    playerStatsSection.setAttribute("style", "display: flex;")
}
const setInventoryStats = () => {
    checkQuant()
    backpackBox.innerText = "";
    weaponBox.setAttribute("style", `background-image: url(${hero.equippedWeapon.img})`)
    weaponBox.addEventListener("click", () => {
        setItemMessage(hero.equippedWeapon)
    })
    armorBox.setAttribute("style", `background-image: url(${hero.equippedArmor.img})`)
    armorBox.addEventListener("click", () => {
        setItemMessage(hero.equippedArmor)
    })
    trinketBox.setAttribute("style", `background-image: url(${hero.equippedTrinket.img})`)
    trinketBox.addEventListener("click", () => {
        setItemMessage(hero.equippedTrinket)
    })
    ringBox.setAttribute("style", `background-image: url(${hero.equippedRing.img})`)
    ringBox.addEventListener("click", () => {
        setItemMessage(hero.equippedRing)
    })

    for (let i = 0; i < hero.inventory.length; i++) {
        const backpackSlot = document.createElement("div")
        backpackSlot.classList.add("backpack-slot")
        backpackSlot.setAttribute("style", `background-image: url(${hero.inventory[i].img})`)
        if(hero.inventory[i].stackable) {
            backpackSlot.innerHTML = hero.inventory[i].quant;
        }
        backpackSlot.addEventListener("click", () => {
            selectedItem = i;
            setItemMessage(hero.inventory[i])
            if(hero.inventory[i].action == "equip") {
                inventoryActionButton.innerHTML = "Equip item"
            } else if(hero.inventory[i].action == "drink") {
                inventoryActionButton.innerHTML = "Drink potion"
            }
            else if(hero.inventory[i].action == "eat") {
                inventoryActionButton.innerHTML = "Eat food"
            }
        })
        backpackBox.appendChild(backpackSlot)
        
    }

}
const checkQuant = () => {
    for (let i = 0; i < hero.inventory.length; i++){
        if(hero.inventory[i].stackable) {
            if(hero.inventory[i].quant < 1) {
                hero.inventory.splice(i, 1)
            }
        }
    }
}
const openInventory = () => {
    onMap=false;
    setInventoryStats()
    
    inventorySection.setAttribute("style", "display: flex;")
}
const setItemMessage = (item) => {
    inventoryMessageBox.innerHTML = item.name + " - Selling price: " + item.sellingPrice;
    if(item.attack > 0) {
        inventoryMessageBox.innerHTML += " - Attack: +" + item.attack;
    }
    if(item.armor > 0) {
        inventoryMessageBox.innerHTML += " - Armor: +" + item.armor;
    }
    if(item.precision > 0) {
        inventoryMessageBox.innerHTML += " - Precision: +" + item.precision + "%";
    }
    if(item.critical > 0) {
        inventoryMessageBox.innerHTML += " - Critical: +" + item.critical + "%";
    }
    if(item.maxLife > 0) {
        inventoryMessageBox.innerHTML += " - Life: +" + item.maxLife;
    }
    if(item.maxMana > 0) {
        inventoryMessageBox.innerHTML += " - Mana: +" + item.maxMana;
    }
    if(item.strength > 0) {
        inventoryMessageBox.innerHTML += " - Strength: +" + item.strength;
    }
    inventoryMessageBox.innerHTML += " - " + item.info;
}
const equipItem = () => {
    if(hero.inventory[selectedItem].type == "weapon") {
        // equipItemSound()
        hero.inventory.push(hero.equippedWeapon)
        hero.equippedWeapon = hero.inventory[selectedItem]
        hero.inventory.splice(selectedItem, 1)
    } else if(hero.inventory[selectedItem].type == "armor") {
        // equipItemSound()
        hero.inventory.push(hero.equippedArmor)
        hero.equippedArmor = hero.inventory[selectedItem]
        hero.inventory.splice(selectedItem, 1)
    }
    else if(hero.inventory[selectedItem].type == "trinket") {
        // equipItemSound()
        hero.inventory.push(hero.equippedTrinket)
        hero.equippedTrinket = hero.inventory[selectedItem]
        hero.inventory.splice(selectedItem, 1)
    } else if(hero.inventory[selectedItem].type == "ring") {
        // equipItemSound()
        hero.inventory.push(hero.equippedRing)
        hero.equippedRing = hero.inventory[selectedItem]
        hero.inventory.splice(selectedItem, 1)
    }
    setInventoryStats()
}
const closePopUp = () => {
    onMap=true;
    playerStatsSection.setAttribute("style", "display: none;")
    inventorySection.setAttribute("style", "display: none;")
}
const setPlayerStats = () => {
    skillsBox.innerText = "";
    skillsToLearnBox.innerText = "";
    hero.setEquippmentStats()
    
    const levelStats = document.querySelector(".level-stats").innerHTML = "Level: " + hero.level;
    const classStats = document.querySelector(".class-stats").innerHTML = "Class: " + hero.playerClass;
    const experienceStats = document.querySelector(".experience-stats").innerHTML = "Experience: " + hero.experience + "/" + experienceList[hero.level];
    const lifeStats = document.querySelector(".life-stats").innerHTML = "Life: " + hero.life + "/" + hero.totalMaxLife + " - (" + hero.maxLife + " +" + (hero.totalMaxLife - hero.maxLife) +")";
    const manaStats = document.querySelector(".mana-stats").innerHTML = "Mana: " + hero.mana + "/" + hero.totalMaxMana + " - (" + hero.maxMana + " +" + (hero.totalMaxMana - hero.maxMana) +")";;
    const strengthStats = document.querySelector(".strength-stats").innerHTML = "Strength: " + hero.strength + " +" + (hero.totalStrength - hero.strength);
    const precisionStats = document.querySelector(".precision-stats").innerHTML = "Precision: " + hero.precision + " +" + (hero.totalPrecision - hero.precision);
    const criticalStats = document.querySelector(".critical-stats").innerHTML = "Critical: " + hero.critical + " +" + (hero.totalCritical - hero.critical);
    const armorStats = document.querySelector(".armor-stats").innerHTML = "Armor: " + hero.totalArmor;
    const attackStats = document.querySelector(".attack-stats").innerHTML = "Attack: " + hero.totalAttack;
    const skillsTitle = document.querySelector(".skills-title").innerHTML = "Your Skills - - - - Skill Points: " + hero.skillPoints;
    for (let i = 0; i < hero.skills.length; i++) {
        const skillSlot = document.createElement("div")
        skillSlot.classList.add("skill-slot")
        skillSlot.setAttribute("style", `background-image: url(${hero.skills[i].img})`)
        skillSlot.addEventListener("click", () => {
            selectedSkill = "none";
            setStatsMessage(hero.skills[i])
        })
        skillsBox.appendChild(skillSlot)
    }
    for (let i = 0; i < hero.skillsToChoose.length; i++) {
        const skillSlot = document.createElement("div")
        skillSlot.classList.add("skill-tl-slot")
        skillSlot.setAttribute("style", `background-image: url(${hero.skillsToChoose[i].img})`)
        skillSlot.addEventListener("click", () => {
            selectedSkill = i;
            setStatsMessage(hero.skillsToChoose[i])
        })
        skillsToLearnBox.appendChild(skillSlot)
    }

}
const setStatsMessage = (skill) => {
    if(selectedSkill == "none") {
        skillSetButton.setAttribute("disabled", "true")
    } else {
        skillSetButton.removeAttribute("disabled")
    }
    statsMessage.innerHTML = `${skill.name} - Mana: ${skill.manaCost} - Skill points to learn: ${skill.skillCost} - ${skill.info}`
    
}
const lootQuant = (item) => {
    let hasItem = false;
    for (let i = 0; i < hero.inventory.length; i++) {
        if(hero.inventory[i].name == item.name){
            hasItem = true;
            hero.inventory[i].quant += item.quant;
        }
        
    }
    if(!hasItem){
        hero.inventory.push(item)
    }
}
const setSkill = () => {
    if(hero.skillPoints >= hero.skillsToChoose[selectedSkill].skillCost) {
        hero.skillPoints -= hero.skillsToChoose[selectedSkill].skillCost;
        hero.skills.push(hero.skillsToChoose[selectedSkill])
        hero.skillsToChoose.splice(selectedSkill, 1)
        setPlayerStats()
    } else {
        statsMessage.innerHTML = "You need more skill points to learn this skill"
    }
}
const openBattle = (selectedMonster) => {
    onMap=false;  
    monster = selectedMonster;
    battleScreen.setAttribute("style", "display: flex;")
    setBattle()
}
const setBattle = () => {
    battleMessage.innerHTML = `You found a ${monster.name}`
    heroLifeBarText.innerHTML = `${hero.life}/${hero.totalMaxLife}`
    heroManaBarText.innerHTML = `${hero.mana}/${hero.totalMaxMana}`
    monsterLifeBarText.innerHTML = `${monster.life}/${monster.maxLife}`
    heroImgBox.setAttribute("style", `background-image: url(${hero.img});`)
    monsterImgBox.setAttribute("style", `background-image: url(${monster.img});`)
    heroLifeBar.setAttribute("style", `width: ${100 / hero.totalMaxLife * hero.life}%;`)
    heroManaBar.setAttribute("style", `width: ${100 / hero.totalMaxMana * hero.mana}%;`)
    monsterLifeBar.setAttribute("style", `width: ${100 / monster.mana * monster.mana}%;`)
}

lootQuant(new RedApple)
lootQuant(new RedApple)
checkAction()


// export default {goDown, goUp}