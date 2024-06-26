import Warrior from "./player-classes.js";
import { SmallPowerRing, SmallRingOfEndurance } from "./item-classes/rings.js";
import { SmallProtectionAmulet } from "./item-classes/trinkets.js";
import { BattleAxe, SteelSword } from "./item-classes/weapons.js";
import { map01, map02 } from "./maps.js";
import { SmallHealthPotion, SmallManaPotion } from "./item-classes/potions.js";
import { RedApple } from "./item-classes/food.js";
import { Strike } from "./skills.js";
import { Goblin } from "./monsters.js";
import { ChainArmor } from "./item-classes/armors.js";


const hero = new Warrior();
// hero.inventory.push(new SmallRingOfEndurance())
// hero.inventory.push(new SmallProtectionAmulet())
// hero.inventory.push(new SteelSword())
// hero.inventory.push(new BattleAxe())
hero.inventory.push(new SmallHealthPotion())
hero.inventory.push(new SmallManaPotion())

let storeItemsList = []



let map;
let respawnArea;
let mapToEnter;
let charXtoGo;
let charYtoGo;

let charPositionX;
let charPositionY;
let mapPositionX;
let mapPositionY;
let action = 1;
let moveCooldown = false;
let onMap = true;
let selectedItem = 0;
let selectedSkill = "none";
let monster;
let effect;
let effectTurns;
let steps = 0;
let npcToTalk;
const experienceList = hero.experienceList;

let bts = "../assets/img/battleScene-01.png";

const mapa01Div = document.querySelector(".mapa01");

const setMap = (currentMap) => {
    
    map = currentMap
    charPositionX = currentMap.initialCharPositionX
    charPositionY = currentMap.initialCharPositionY
    mapPositionX = currentMap.mapPositionX
    mapPositionY = currentMap.mapPositionY
    respawnArea = currentMap.respawnMap
    mapa01Div.innerText = "";
    mapa01Div.setAttribute("style", `background-image: url(${currentMap.mapBg}); height: ${currentMap.height}px; width: ${currentMap.width}px; right: ${currentMap.mapPositionX}px; bottom: ${currentMap.mapPositionY}px;`)
    
    
}
setMap(map01)


const createSkillButtons =() => {
    batteActionsBox.innerText = ""
    for (let i = 0; i < hero.skills.length; i++) {
        const skillButton = document.createElement("button")
        skillButton.classList.add("battle-actions-buttons")
        skillButton.setAttribute("style", `background-image: url(${hero.skills[i].img});`)
        skillButton.addEventListener("click", () => {
            if(hero.mana >= hero.skills[i].manaCost) {
                battleTurn(i)
            }
            
            
            
        })
        if(hero.mana >= hero.skills[i].manaCost) {
            skillButton.removeAttribute("disabled")
        } else {
            skillButton.setAttribute("disabled", "true")
        }
        batteActionsBox.appendChild(skillButton)

        
    }
}

const screen = document.querySelector(".screen");

const charDiv = document.querySelector(".char");

const soundEffect = document.getElementById("sound-effect")

const actionButton = document.querySelector(".action-button")
const upButton = document.querySelector(".up-button")
const downButton = document.querySelector(".down-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const inventoryButton = document.querySelector(".backpack-button")
const mapLifeBar = document.querySelector(".map-life-bar")
const mapManaBar = document.querySelector(".map-mana-bar")
const mapXpBar = document.querySelector(".map-xp-bar")
const mapLifeText = document.querySelector(".map-life-bar-text")
const mapManaText = document.querySelector(".map-mana-bar-text")
const mapXpText = document.querySelector(".map-xp-bar-text")

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
const battleBgImg = document.querySelector(".battle-scene")
const batteActionsBox = document.querySelector(".skills-action-box")
const lifePotionBtlImg = document.querySelector(".life-potion-button")
const manaPotionBtlImg = document.querySelector(".mana-potion-button")
const attackButton = document.querySelector(".attack-button")
const battleActionContainer = document.querySelector(".battle-actions-box")
const heroVfxAnimation = document.querySelector(".hero-hit-animation")
const monsterVfxAnimation = document.querySelector(".monster-hit-animation")
const leaveBattleButton = document.querySelector(".leave-battle-button")

const lootMessageBox = document.querySelector(".loot-message-box")

const storeScreen = document.querySelector(".store-screen")
const storeCloseButton = document.querySelector(".store-close-button")
const storeItemsBox = document.querySelector(".store-items-box")
const storeMessage = document.querySelector(".store-message")
const storeTitle = document.querySelector(".store-title")
const storeSellingButton = document.querySelector(".store-action-button")
const sellingStoreScreen = document.querySelector(".selling-store-screen")
const sellingStoreCloseButton = document.querySelector(".selling-store-close-button")
const sellingStoreItemsBox = document.querySelector(".selling-store-items-box")
const sellingStoreMessage = document.querySelector(".selling-store-message")
const sellingStoreTitle = document.querySelector(".selling-store-title")

const transitionScreen = document.querySelector(".transition-screen")

const npcScreen = document.querySelector(".npc-screen")
const npcFaceImg = document.querySelector(".npc-face-img")
const npcName = document.querySelector(".npc-name")
const npcInitialTalk = document.querySelector(".initial-talk")
const npcQuestsBox = document.querySelector(".npc-quests-box")
const npcCloseButton = document.querySelector(".npc-close-button")

const questScreen = document.querySelector(".quest-screen")
const questCloseButton = document.querySelector(".quest-close-button")
const questName = document.querySelector(".quest-name")
const questDescription = document.querySelector(".quest-description")
const goldRewardText = document.querySelector(".gold-reward-text")
const xpRewardText = document.querySelector(".xp-reward-text")
const questRewardBox = document.querySelector(".quest-reward-box")
const questRewardItemsList = document.querySelector(".quest-reward-items-list")
const questActionButton = document.querySelector(".quest-action-button")
const questStatsMessage = document.querySelector(".quest-stats-message")

leaveBattleButton.addEventListener("click", ()=>{
    battleTurn("leave")
})
questCloseButton.addEventListener("click", ()=>{

    talkToNpc()
})
npcCloseButton.addEventListener("click", ()=>{
    onMap = true
    npcScreen.setAttribute("style", "display: none;")
    setMapStats()
})
const openTransitionScreen = () => {
    onMap=false;
    transitionScreen.setAttribute("style", "display: flex;")
}

const defeatedScreen = document.querySelector(".defeated-screen")

storeSellingButton.addEventListener("click", () => {
    makeSoundEffect("../assets/audio/metal-clang.mp3")
    setSellingStoreStats()
    openSellingStore()
})
sellingStoreCloseButton.addEventListener("click", () => {
    openStore()
})
const setStoreStats = () => {
    storeTitle.innerHTML = `Store - Gold: ${hero.gold}`
}
const setSellingStoreStats = () => {
    sellingStoreTitle.innerHTML = `Store - Gold: ${hero.gold}`
}
const setStoreItems = (itemsList) => {
    setStoreStats()
    storeItemsBox.innerText = ""
    for (let i = 0; i < itemsList.length; i++) {
        let possibleInput;
        const storeItemContainer = document.createElement("div")
        storeItemContainer.classList.add("store-item-container")
        
        const storeItemImg = document.createElement("img")
        storeItemImg.classList.add("store-item-img")
        storeItemImg.setAttribute("src", itemsList[i].item.img)
        storeItemContainer.appendChild(storeItemImg)
        
        const storeItemName = document.createElement("p")
        storeItemName.innerHTML = itemsList[i].item.name + " - " + itemsList[i].price + " gold"
        storeItemName.addEventListener("click", () => {
            makeSoundEffect("../assets/audio/metal-clang.mp3")
            setStoreItemMessage(itemsList[i].item)
        })
        storeItemContainer.appendChild(storeItemName)

        if(itemsList[i].item.stackable) {
            const storeItemInput = document.createElement("input")
            storeItemInput.setAttribute("type", "number")
            storeItemInput.classList.add("store-item-input")
            possibleInput = storeItemInput
            storeItemContainer.appendChild(storeItemInput)
        }

        const storeItemButton = document.createElement("button")
        storeItemButton.classList.add("buy-buttons")
        storeItemButton.innerHTML = "Buy"
        storeItemButton.addEventListener("click", () => {
            buyItem(itemsList[i], possibleInput)
            if(itemsList[i].item.stackable){
                possibleInput.value = 0
            }
            
            setStoreStats()
        })
        storeItemContainer.appendChild(storeItemButton)

        storeItemsBox.appendChild(storeItemContainer)
    }
}
const setSellingStoreItems = () => {
    sellingStoreItemsBox.innerText = ""
    for (let i = 0; i < hero.inventory.length; i++){
        let possibleInput;
        const storeItemContainer = document.createElement("div")
        storeItemContainer.classList.add("selling-store-item-container")
        
        const storeItemImg = document.createElement("img")
        storeItemImg.classList.add("selling-store-item-img")
        storeItemImg.setAttribute("src", hero.inventory[i].img)
        storeItemContainer.appendChild(storeItemImg)
        
        const storeItemName = document.createElement("p")
        storeItemName.innerHTML = hero.inventory[i].name + " - " + hero.inventory[i].sellingPrice + " gold"
        storeItemName.addEventListener("click", () => {
            makeSoundEffect("../assets/audio/metal-clang.mp3")
            setSellingStoreItemMessage(hero.inventory[i])
        })
        storeItemContainer.appendChild(storeItemName)

        // ------------
        if(hero.inventory[i].stackable) {
            storeItemName.innerHTML += " - " + hero.inventory[i].quant
            const storeItemInput = document.createElement("input")
            storeItemInput.setAttribute("type", "number")
            storeItemInput.classList.add("selling-store-item-input")
            possibleInput = storeItemInput
            storeItemContainer.appendChild(storeItemInput)
        }

        const storeItemButton = document.createElement("button")
        storeItemButton.classList.add("selling-buy-buttons")
        storeItemButton.innerHTML = "Sell"
        storeItemButton.addEventListener("click", () => {
            sellItem(hero.inventory[i], possibleInput)
            if(hero.inventory[i].stackable){
                possibleInput.value = 0
            }
            
            setSellingStoreStats()
        })
        storeItemContainer.appendChild(storeItemButton)

        sellingStoreItemsBox.appendChild(storeItemContainer)

    }
}

const setSellingStoreItemMessage = (item) => {
    sellingStoreMessage.innerHTML = item.name + " - Selling price: " + item.sellingPrice;
    if(item.attack > 0) {
        sellingStoreMessage.innerHTML += " - Attack: +" + item.attack;
    }
    if(item.armor > 0) {
        sellingStoreMessage.innerHTML += " - Armor: +" + item.armor;
    }
    if(item.precision > 0) {
        sellingStoreMessage.innerHTML += " - Precision: +" + item.precision + "%";
    }
    if(item.critical > 0) {
        sellingStoreMessage.innerHTML += " - Critical: +" + item.critical + "%";
    }
    if(item.maxLife > 0) {
        sellingStoreMessage.innerHTML += " - Life: +" + item.maxLife;
    }
    if(item.maxMana > 0) {
        sellingStoreMessage.innerHTML += " - Mana: +" + item.maxMana;
    }
    if(item.strength > 0) {
        sellingStoreMessage.innerHTML += " - Strength: +" + item.strength;
    }
    sellingStoreMessage.innerHTML += " - " + item.info;
}
const setStoreItemMessage = (item) => {
    storeMessage.innerHTML = item.name + " - Selling price: " + item.sellingPrice;
    if(item.attack > 0) {
        storeMessage.innerHTML += " - Attack: +" + item.attack;
    }
    if(item.armor > 0) {
        storeMessage.innerHTML += " - Armor: +" + item.armor;
    }
    if(item.precision > 0) {
        storeMessage.innerHTML += " - Precision: +" + item.precision + "%";
    }
    if(item.critical > 0) {
        storeMessage.innerHTML += " - Critical: +" + item.critical + "%";
    }
    if(item.maxLife > 0) {
        storeMessage.innerHTML += " - Life: +" + item.maxLife;
    }
    if(item.maxMana > 0) {
        storeMessage.innerHTML += " - Mana: +" + item.maxMana;
    }
    if(item.strength > 0) {
        storeMessage.innerHTML += " - Strength: +" + item.strength;
    }
    storeMessage.innerHTML += " - " + item.info;
}


storeCloseButton.addEventListener("click", () => {
    closePopUp()
    storeMessage.innerHTML = "Select an item to see the description"
})

lifePotionBtlImg.addEventListener("click", () => {
    
    battleTurn("drinkHp")
    
})
manaPotionBtlImg.addEventListener("click", () => {
    
    battleTurn("drinkMp")
    
})
attackButton.addEventListener("click", () => {
    
    battleTurn("weaponAttack")
    
})

const victoryScreen = document.querySelector(".victory-screen")

hero.setEquippmentStats()

inventoryActionButton.addEventListener("click", () => {
    if(hero.inventory[selectedItem].action == "equip"){
        makeSoundEffect("../assets/audio/item-equip.mp3")
        equipItem()
    } else if(hero.inventory[selectedItem].action == "drink"){
        makeSoundEffect("../assets/audio/sfx-magic-01.mp3")
        hero.inventory[selectedItem].drink(hero)
        setInventoryStats()
    } else if(hero.inventory[selectedItem].action == "eat"){
        makeSoundEffect("../assets/audio/sfx-magic-01.mp3")
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
        return (map.map[charPositionY - 1][charPositionX] == 1)  && !moveCooldown
    }
    if(direction == "down") {
        return (map.map[charPositionY + 1][charPositionX] == 1)  && !moveCooldown
    }
    if(direction == "left") {
        return (map.map[charPositionY][charPositionX - 1] == 1)  && !moveCooldown
    }
    if(direction == "right") {
        return (map.map[charPositionY][charPositionX + 1] == 1)  && !moveCooldown
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
    if(checkWalkableTile("down")) {
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
    
    if(checkWalkableTile("left")) {  
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
    
    if(checkWalkableTile("right")) {  
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
const completeQuest = (questToComplete) => {
    let indice;
    hero.activeQuests.map((quest, i) => {
        if(quest.name == questToComplete.name){
            indice = i
        }
    })
    let hasItem=false;
    hero.inventory.map((item)=>{
        if(item.name == questToComplete.questItem.name){
            hasItem = true
        }
    })
    
    if(questToComplete.type == "gathering") {
        if(hasItem){
            if(hero.inventory[searchItemId(questToComplete.questItem)].quant > questToComplete.quant) {
                hero.inventory[searchItemId(questToComplete.questItem)].quant -= questToComplete.quant
                hero.completedQuests.push(questToComplete)
                hero.gold += questToComplete.goldReward
                hero.experience += questToComplete.xpReward
                questToComplete.itemsReward.map((item)=>{
                    hero.inventory.push(item)
                })
                hero.levelUp(questToComplete.xpReward)
                hero.activeQuests.splice(indice, 1)
                questStatsMessage.innerHTML = "Quest completed"
                talkToNpc()
            } else if(hero.inventory[searchItemId(questToComplete.questItem)].quant == questToComplete.quant){
                hero.inventory.splice(searchItemId(questToComplete.questItem), 1)
                hero.activeQuests.splice(indice, 1)
                hero.completedQuests.push(questToComplete)
                hero.gold += questToComplete.goldReward
                hero.experience += questToComplete.xpReward
                questToComplete.itemsReward.map((item)=>{
                    hero.inventory.push(item)
                })
                hero.levelUp(questToComplete.xpReward)
                questStatsMessage.innerHTML = "Quest completed"
                talkToNpc()
            } else {
                questStatsMessage.innerHTML = "You need to gather all items"
            }
        } else {
            questStatsMessage.innerHTML = "You need to gather all items"
        }
        
    }
}
const setQuestStats = (questScreenSelected) => {
    questRewardItemsList.innerText = ""
    let QuestIsActive = false
    hero.activeQuests.map((quest)=>{
        if (quest.name == questScreenSelected.name){
            QuestIsActive = true
        }
    })
    
    questActionButton.innerHTML = QuestIsActive ? "Complete quest" : "Accept quest";
    questActionButton.addEventListener("click", ()=>{
        if(QuestIsActive){
            
            completeQuest(questScreenSelected)
        }
        else{
            if(!hero.activeQuests.includes(questScreenSelected)){
                hero.activeQuests.push(questScreenSelected)
            } else {
                completeQuest(questScreenSelected)
            }
            
            questActionButton.innerHTML = "Complete quest"
        }
    })
    if(questScreenSelected.level > hero.level){
        questActionButton.setAttribute("disabled", "true")
    } else{
        questActionButton.removeAttribute("disabled")
    }
    questName.innerHTML = questScreenSelected.name
    questDescription.innerHTML = `Level: ${questScreenSelected.level} - ${questScreenSelected.description}`
    if(questScreenSelected.goldReward > 0) {
        goldRewardText.innerHTML = `Gold: ${questScreenSelected.goldReward}`
    }
    if(questScreenSelected.xpReward > 0) {
        xpRewardText.innerHTML = `Experience: ${questScreenSelected.xpReward}`
    }
    // questRewardBox
    questScreenSelected.itemsReward.map((rewardItem)=>{
        const itemRewardBox = document.createElement("div")
        itemRewardBox.classList.add("item-reward-box")
        const itemRewardImg = document.createElement("img")
        itemRewardImg.classList.add("item-reward-img")
        itemRewardImg.setAttribute("src", rewardItem.img)
        const itemRewardName = document.createElement("p")
        itemRewardName.innerHTML = rewardItem.name

        itemRewardBox.appendChild(itemRewardImg)
        itemRewardBox.appendChild(itemRewardName)

        questRewardItemsList.appendChild(itemRewardBox)
    })

}
const openQuestScreen = (questScreenSelected) => {
    questScreen.setAttribute("style", "display: flex;")
    npcScreen.setAttribute("style", "display: none;")
    setQuestStats(questScreenSelected)
}
const setNpcScreen = () => {
    npcQuestsBox.innerText = ""
    npcFaceImg.setAttribute("src", npcToTalk.faceImg)
    npcName.innerHTML = npcToTalk.name
    npcInitialTalk.innerHTML = npcToTalk.initialText(hero)
    npcToTalk.questList.map((quest)=>{
        let isCompleted = false;
        hero.completedQuests.map((e)=>{
            if(quest.name == e.name){
                isCompleted = true
            }
        })
        if(!isCompleted){

            const questListItem = document.createElement("div")
            questListItem.classList.add("quest-item-list")
            questListItem.innerHTML = quest.name
            questListItem.addEventListener("click", ()=>{
                openQuestScreen(quest)
            })
            npcQuestsBox.appendChild(questListItem)
        }
    })
}
const talkToNpc = () => {
    onMap = false;
    npcScreen.setAttribute("style", "display: flex;")
    questScreen.setAttribute("style", "display: none;")
    setNpcScreen()
}
const takeAction = () => {
    
    if (action == 3) {
        openStore()
    }
    if (action == 2) {
        openTransitionScreen()
        setMap(mapToEnter)
        setTimeout(()=>{
            onMap=true
            transitionScreen.setAttribute("style", "display: none;")
        }, 1000)
        // charPositionX = charXtoGo
        // charPositionY = charYtoGo
        action = 0;
        actionButton.setAttribute("style", "background: none; cursor: auto")
        actionButton.innerHTML = ""
    }
    if (action == 5) {
        talkToNpc()
    }
}
const checkAction = () => {
    steps++;
    let mapAction = map.checkAction(charPositionX, charPositionY)
    let respawnMob = map.checkRespawn(charPositionX, charPositionY)
    if(respawnMob.name.length > 1 && steps > 3){
        steps = 0;
        openBattle(respawnMob)
    }
    
    if(mapAction.action == 3) {
        action = 3;
        storeItemsList = mapAction.itemsList
        actionButton.innerHTML = mapAction.buttonName;
        actionButton.setAttribute("style", "background: white; cursor: pointer")
    } else if(mapAction.action == 2) {
        mapToEnter = mapAction.mapToEnter
        charXtoGo = mapAction.charPositionX
        charYtoGo = mapAction.charPositionY
        actionButton.innerHTML = "Enter";
        actionButton.setAttribute("style", "background: white; cursor: pointer")
        action = 2
    } else if(mapAction.action == 5) {
        
        actionButton.innerHTML = "Talk";
        actionButton.setAttribute("style", "background: white; cursor: pointer")
        action = 5
        npcToTalk = mapAction.npc
    } else {
        action = 0;
        actionButton.setAttribute("style", "background: none; cursor: auto")
        actionButton.innerHTML = ""
    }
}
const openPlayerStats = () => {
    makeSoundEffect("../assets/audio/metal-clang.mp3")
    onMap=false;
    setPlayerStats()
    playerStatsSection.setAttribute("style", "display: flex;")
}
const setInventoryStats = () => {
    checkQuant()
    backpackBox.innerText = "";
    const inventoryTitle = document.querySelector(".inventory-title").innerHTML = `<span style="font-weight:bold; font-size: 20px;">Inventory</span> - Life: ${hero.life}/${hero.totalMaxLife} - Mana: ${hero.mana}/${hero.totalMaxMana} - <span style="color:gold">Gold: ${hero.gold}</span>`
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
            makeSoundEffect("../assets/audio/metal-clang.mp3")
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
    makeSoundEffect("../assets/audio/item-equip.mp3")
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
    makeSoundEffect("../assets/audio/metal-clang.mp3")
    onMap=true;
    setMapStats()
    playerStatsSection.setAttribute("style", "display: none;")
    inventorySection.setAttribute("style", "display: none;")
    storeScreen.setAttribute("style", "display: none;")
    transitionScreen.setAttribute("style", "display: none;")
    battleScreen.setAttribute("style", "display: none;")
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
            makeSoundEffect("../assets/audio/metal-clang.mp3")
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
            hero.inventory[i].quant ++;
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
    battleMessage.innerHTML = `You found a ${monster.name}`
    battleScreen.setAttribute("style", "display: flex;")
    
    createSkillButtons()
    setBattle()
}
const setBattle = () => {
    // console.log(hero.skills)
    heroLifeBarText.innerHTML = `${hero.life}/${hero.totalMaxLife}`
    heroManaBarText.innerHTML = `${hero.mana}/${hero.totalMaxMana}`
    monsterLifeBarText.innerHTML = `${monster.life}/${monster.maxLife}`
    heroImgBox.setAttribute("style", `background-image: url(${hero.img});`)
    monsterImgBox.setAttribute("style", `background-image: url(${monster.img});`)
    heroLifeBar.setAttribute("style", `width: ${100 / hero.totalMaxLife * hero.life}%;`)
    heroManaBar.setAttribute("style", `width: ${100 / hero.totalMaxMana * hero.mana}%;`)
    monsterLifeBar.setAttribute("style", `width: ${100 / monster.maxLife * monster.life}%;`)
    battleBgImg.setAttribute("style", `background-image: url(${bts});`)
    
    
    lifePotionBtlImg.innerHTML = checkQuantity(new SmallHealthPotion())
    manaPotionBtlImg.innerHTML = checkQuantity(new SmallManaPotion)
    if(!searchItem(new SmallHealthPotion()) || hero.inventory[searchItemId(new SmallHealthPotion())].quant < 1) {

        lifePotionBtlImg.setAttribute("disabled", "true")
    }
    
    if(!searchItem(new SmallManaPotion()) || hero.inventory[searchItemId(new SmallManaPotion())].quant < 1) {
        manaPotionBtlImg.setAttribute("disabled", "true")
    }
    
    attackButton.setAttribute("style", `background-image: url(${hero.equippedWeapon.img});`)
   
    
    
}

const checkQuantity = (itemToSearch) => {
    for (let i = 0; i < hero.inventory.length; i++) {
        if(itemToSearch.name == hero.inventory[i].name) {
            return hero.inventory[i].quant;
        }
        
    }
    return 0;
}
const searchItem = (itemToSearch) => {
    for (let i = 0; i < hero.inventory.length; i++) {
        if(itemToSearch.name == hero.inventory[i].name) {
            return true;
        }
        
    }
    return false;
}
const searchItemId = (itemToSearch) => {
    for (let i = 0; i < hero.inventory.length; i++) {
        if(itemToSearch.name == hero.inventory[i].name) {
            return i;
        }
        
    }
    return false;
}
const openVictoryScreen = (monsterDefeated) => {
    makeSoundEffect("../assets/audio/tada-fanfare-01.mp3")
    
    lootMessageBox.innerText = "";

    const levelUpMessage = document.querySelector(".level-up-message")
    levelUpMessage.setAttribute("style", "display: none;")
    levelUpMessage.innerHTML = ""
    hero.experience += monsterDefeated.experience;
    
    if (hero.experience >= hero.experienceList[hero.level]) {
        hero.levelUp(monsterDefeated.experience)
        levelUpMessage.setAttribute("style", "display: block;")
        levelUpMessage.innerHTML = `Congrats! You reached level ${hero.level}`
    }
    let loot = monsterDefeated.dropItems()
    let goldDropped = monster.dropGold()
    hero.gold += goldDropped;
    
    const xpMessage = document.querySelector(".xp-message")
    xpMessage.innerHTML = `You gained ${monsterDefeated.experience}xp`;
    const goldMessage = document.querySelector(".gold-message")
    goldMessage.innerHTML = `You found ${goldDropped} gold`

    for (let i = 0; i < loot.length; i++) {
        const lootMessage = document.createElement("p")
        lootMessage.classList.add("loot-message")
        const lootMessageSlot = document.createElement("div")
        lootMessageSlot.classList.add("loot-message-slot")
        const lootImg = document.createElement("img")
        lootImg.classList.add("loot-image")
        
        if(loot[i].stackable){
            lootQuant(loot[i])
            lootMessage.innerHTML = `You found ${loot[i].name}`
            lootImg.setAttribute("src", loot[i].img)
            lootMessageSlot.appendChild(lootImg)
            lootMessageSlot.appendChild(lootMessage)
            lootMessageBox.appendChild(lootMessageSlot)
        } else {
            hero.inventory.push(loot[i])
            lootMessage.innerHTML = `You found ${loot[i].name}`
            lootImg.setAttribute("src", loot[i].img)
            lootMessageSlot.appendChild(lootImg)
            lootMessageSlot.appendChild(lootMessage)
            lootMessageBox.appendChild(lootMessageSlot)
        }
        
    }
    
    victoryScreen.setAttribute("style", "display: flex;")
    battleScreen.setAttribute("style", "display: none;")
    const victoryCloseButton = document.querySelector(".close-victory-screen")
    victoryCloseButton.addEventListener("click", () => {
        victoryScreen.setAttribute("style", "display: none;")
        onMap=true;
    })
    setMapStats()
}

const openDefeatedScreen = () => {
    defeatedScreen.setAttribute("style", "display: flex;")
    battleScreen.setAttribute("style", "display: none;")
    const defeatedText = document.querySelector(".defeated-text")
    defeatedText.innerHTML = `You died at level ${hero.level} and need to start over.`
    const startOverButton = document.querySelector(".start-over-button")
    startOverButton.addEventListener("click", ()=>{
        location.reload()
    })
}

const battleTurn = (actionType) => {
    let damage;

    
    
    if (actionType == "weaponAttack") {
        makeSoundEffect("../assets/audio/sword-sound-01.mp3")
        monsterVfxAnimation.setAttribute("style", "display: block;")
        setTimeout(()=>{
            monsterVfxAnimation.setAttribute("style", "display: none;")
        }, 300)
        damage = hero.attack();
        monster.takeDamage(damage)
        battleMessage.innerHTML = `You deal ${damage} hitpoints on the ${monster.name}`
    } else if (actionType == 0) {
        if(hero.skills[0].type == "effect") {
            effect = hero.skills[0].effect(hero);
            damage = effect.damage;
            monster.takeDamage(damage)
            effectTurns = effect.turns;
        }
        if(hero.skills[0].type == "hit") {
            makeSoundEffect("../assets/audio/sword-sound-01.mp3")
            monsterVfxAnimation.setAttribute("style", "display: block;")
            setTimeout(()=>{
                monsterVfxAnimation.setAttribute("style", "display: none;")
            }, 300)
            damage = hero.skills[0].attack(hero);
            monster.takeDamage(damage)
            battleMessage.innerHTML = `You deal ${damage} hitpoints on the ${monster.name}`
        }
        
    } else if (actionType == 1) {
        if(hero.skills[1].type == "effect") {
            effect = hero.skills[1].effect(hero);
            damage = effect.damage;
            monster.takeDamage(damage)
            effectTurns = effect.turns;
        }
        if(hero.skills[1].type == "hit") {
            makeSoundEffect("../assets/audio/sword-sound-01.mp3")
            monsterVfxAnimation.setAttribute("style", "display: block;")
            setTimeout(()=>{
                monsterVfxAnimation.setAttribute("style", "display: none;")
            }, 300)
            damage = hero.skills[1].attack(hero);
            monster.takeDamage(damage)
            battleMessage.innerHTML = `You deal ${damage} hitpoints on the ${monster.name}`
        }
        
    } else if (actionType == "drinkHp") {
        hero.inventory[searchItemId(new SmallHealthPotion())].drink(hero)
        
    } else if (actionType == "drinkMp") {
        hero.inventory[searchItemId(new SmallManaPotion())].drink(hero)
    }
    const actionList = battleActionContainer.querySelectorAll("button")
    
    for (let i = 0; i < actionList.length; i++) {
        actionList[i].setAttribute("disabled", "true")
    }

        
    
    
    setBattle()
    if(monster.life > 0){
        if(effectTurns > 0) {
            setTimeout(() => {
                if(effect.type == "bleeding") {
                    monster.takeDamage(effect.damage)
                    effectTurns--;
                    battleMessage.innerHTML = `${monster.name} lost ${effect.damage} hitpoints due to ${effect.type}`
                    setBattle()
                }
            }, 700)
        }
    }

    
    if(monster.life > 0){
        setTimeout(() => {
            makeSoundEffect("../assets/audio/sword-sound-01.mp3")
            heroVfxAnimation.setAttribute("style", "display: block;")
            setTimeout(()=>{
                heroVfxAnimation.setAttribute("style", "display: none;")
            }, 300)
            let monsterDamage = monster.attack()
            hero.takeDamage(monsterDamage)
            battleMessage.innerHTML = `You lost ${Math.max(0, monsterDamage - hero.totalArmor)} hitpoints to a ${monster.name} attack`

            for (let i = 0; i < actionList.length; i++) {
                
                    actionList[i].removeAttribute("disabled")
                
                
            }
            if (hero.life <= 0) {
                openDefeatedScreen()
                return
            }

            setBattle()
            setTimeout(()=>{

                if (actionType == "leave") {
                    closePopUp()
                    console.log("clicou sair")
                }
            }, 800)
        }, 700)
        

        
    } else {
        for (let i = 0; i < actionList.length; i++) {
            if(i == 1) {
                if(searchItem(new SmallHealthPotion()) && hero.inventory[searchItemId(new SmallHealthPotion())].quant > 0) {
                    
                    lifePotionBtlImg.removeAttribute("disabled")
                }
            } else if(i == 2) {
                if(searchItem(new SmallManaPotion()) && hero.inventory[searchItemId(new SmallManaPotion())].quant > 0) {
                    
                    manaPotionBtlImg.removeAttribute("disabled")
                }
            } else {
                actionList[i].removeAttribute("disabled")
            }
            
        }
        if(monster.isBoss){
            map.bossIsKilled = true
        }
        setTimeout(() => {

            openVictoryScreen(monster)
        }, 500)
        
        return
    }
    

    

    
    setBattle()

}
const setMapStats = () => {
    hero.setEquippmentStats()
    mapLifeBar.setAttribute("style", `width: ${100 / hero.totalMaxLife * hero.life}%;`)
    mapManaBar.setAttribute("style", `width: ${100 / hero.totalMaxMana * hero.mana}%;`)
    mapXpBar.setAttribute("style", `width: ${100 / (experienceList[hero.level] - experienceList[hero.level - 1]) * (hero.experience - experienceList[hero.level - 1]) }%;`)
    mapLifeText.innerHTML = `${hero.life}/${hero.totalMaxLife}`
    mapManaText.innerHTML = `${hero.mana}/${hero.totalMaxMana}`
    mapXpText.innerHTML = `${hero.experience}/${experienceList[hero.level]}`
}


const openStore = () => {
    makeSoundEffect("../assets/audio/metal-clang.mp3")
    onMap=false;  
    storeScreen.setAttribute("style", "display: flex;")
    sellingStoreScreen.setAttribute("style", "display: none;")
    setStoreItems(storeItemsList)
}
const buyItem = (option, quantInput) => {
    
    if(option.item.stackable) {
        const quantityToBuy = parseInt(quantInput.value)
        if(quantityToBuy > 0) {
            if(hero.gold >= (option.price * quantityToBuy)) {
                makeSoundEffect("../assets/audio/coin-dropped.mp3")
                hero.gold -= (option.price * quantityToBuy);
                storeMessage.innerHTML = `You bought ${quantityToBuy} ${option.item.name} for ${option.price * quantityToBuy} gold`
                for (let i = 0; i < quantityToBuy; i++) {
                    lootQuant(option.item)
                    
                }
            } else {
                storeMessage.innerHTML = "You don't have enough gold"
            }
        } else {
            storeMessage.innerHTML = "Quantity need to be higher than 0"
        }
        
    } else {
        if(hero.gold >= option.price) {
            makeSoundEffect("../assets/audio/coin-dropped.mp3")
            storeMessage.innerHTML = `You bought ${option.item.name} for ${option.price} gold`
            hero.gold -= option.price
            hero.inventory.push(option.item)
        } else {
            storeMessage.innerHTML = "You don't have enough gold"
        }
    }
}
const sellItem = (option, quantInput) => {
    if(option.stackable) {
        const quantityToSell = parseInt(quantInput.value)
        if(quantityToSell > 0) {
            if(option.quant > quantityToSell) {
                makeSoundEffect("../assets/audio/coin-dropped.mp3")
                hero.gold += (option.sellingPrice * quantityToSell);
                option.quant -= quantityToSell
                sellingStoreMessage.innerHTML = `You sold ${quantityToSell} ${option.name} for ${option.sellingPrice * quantityToSell} gold`
                setSellingStoreStats()
                
            } else if(option.quant == quantityToSell){
                makeSoundEffect("../assets/audio/coin-dropped.mp3")
                hero.gold += (option.sellingPrice * quantityToSell);
                hero.inventory.splice(searchItemId(option), 1)
                setSellingStoreStats()
            } else {
                sellingStoreMessage.innerHTML = "You need to select less or equal the quantity of the item you want to sell"
            }
        } else {
            sellingStoreMessage.innerHTML = "Quantity need to be higher than 0"
        }
        
    } else {
        makeSoundEffect("../assets/audio/coin-dropped.mp3")
        sellingStoreMessage.innerHTML = `You sold ${option.name} for ${option.sellingPrice} gold`
        hero.gold += option.sellingPrice
        hero.inventory.splice(searchItemId(option), 1)
        setSellingStoreStats()
    }
    openSellingStore()
}

const openSellingStore = () => {
    onMap=false;  
    sellingStoreScreen.setAttribute("style", "display: flex;")
    storeScreen.setAttribute("style", "display: none;")
    setSellingStoreItems()
}

const makeSoundEffect = (source) => {
    soundEffect.setAttribute("src", source)
    soundEffect.play()
}

setMapStats()

lootQuant(new RedApple)
lootQuant(new RedApple)
lootQuant(new SmallHealthPotion)
checkAction()


// export default {goDown, goUp}