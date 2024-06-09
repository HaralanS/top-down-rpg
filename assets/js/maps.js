import { Goblin, GoblinCaptain, GoblinChief, GoblinSoldier } from "./monsters.js";
import { SteelSword } from "./item-classes/weapons.js";
import { SmallHealthPotion, SmallManaPotion } from "./item-classes/potions.js";
import { ChainArmor } from "./item-classes/armors.js";
import { VillageChief } from "./npcs.js";

export const map01 = {
    map: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,5,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,4,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    respawnMap:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    mapBg: "../assets/img/village-map-01.png",
    height: 960,
    width: 960,
    initialCharPositionX: 7,
    initialCharPositionY: 3,
    mapPositionX: 256,
    mapPositionY: 0,
    bossIsKilled: false,
    checkRespawn(positionX, positionY){
        
        if(this.respawnMap[positionY][positionX] == 1) {
            const random = Math.random() * 100;
            if(random > 90) {
                return new Goblin()
            }
        }
        return {
            name: ""
        }
    },
    checkAction(posX, posY) {
        
        if(this.map[posY-1][posX] == 4) {
            
            return {
                action: 3,
                buttonName: "Sell/Buy",
                itemsList: [
                    {
                        item: new SmallHealthPotion(),
                        price: 10
                    },
                    {
                        item: new SmallManaPotion(),
                        price: 10
                    },
                    {
                        item: new SteelSword(),
                        price: 80
                    },
                    {
                        item: new ChainArmor(),
                        price: 70
                    },
                ]
            }
        } else if(this.map[posY-1][posX] == 2){
            return {
                action: 2,
                buttonName: "Enter",
                mapToEnter: map02,
                charPositionX: 5,
                charPositionY: 3,
            }
        } else if(this.map[posY-1][posX] == 3){
            return {
                action: 2,
                buttonName: "Enter",
                mapToEnter: map03,
                charPositionX: 9,
                charPositionY: 18,
            }
        } else if(this.map[posY-1][posX] == 5){
            return {
                action: 5,
                buttonName: "Talk",
                npc: new VillageChief(),
            }
        } else {
            return {
                action: 0
            }
        }
    }
}
export const map02 = {
    map: [
        [0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0],
        [0,1,1,1,1,1,0],
        [0,1,1,1,1,1,2],
        [0,1,1,1,1,1,0],
        [0,1,1,1,1,1,0],
        [0,0,0,0,0,0,0]
    ],
    respawnMap:[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ],
    mapBg: "../assets/img/house-01.png",
    height: 448,
    width: 448,
    initialCharPositionX: 5,
    initialCharPositionY: 3,
    mapPositionX: 128,
    mapPositionY: 0,
    checkRespawn(positionX, positionY){
        
        // if(this.respawnMap[positionY][positionX] == 1) {
        //     const random = Math.random() * 100;
        //     if(random > 90) {
        //         return new Goblin()
        //     }
        // }
        return {
            name: ""
        }
    },
    checkAction(posX, posY) {
        
        if(this.map[posY][posX+1] == 2){
            return {
                action: 2,
                buttonName: "Enter",
                mapToEnter: map01,
                charPositionX: 3,
                charPositionY: 6,
            }
        } else {
            return {
                action: 0
            }
        }
    }
}
export const map03 = {
    map: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0],
        [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,1,1,0],
        [0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,1,1,0,0],
        [0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0],
        [0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
        [0,1,1,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0]
    ],
    respawnMap:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,9,9,0,3,3,3,3,0,3,3,3,3,0,3,3,3,3,0,0],
        [0,9,9,3,3,3,3,3,3,3,3,3,3,3,3,3,0,3,0,0],
        [0,9,9,3,3,3,3,0,0,0,0,0,0,3,0,0,0,0,0,0],
        [0,9,9,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,3,3,3,0,0,0,2,2,2,2,0,0,0,0,0,2,2,0],
        [0,0,3,3,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0],
        [0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,2,2,2,0],
        [0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,2,2,2,0],
        [0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0],
        [0,2,2,0,2,2,0,0,2,2,0,0,0,0,0,0,2,2,0,0],
        [0,2,2,0,0,0,0,0,0,0,0,0,1,0,0,2,2,2,2,0],
        [0,0,2,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,0],
        [0,0,2,0,2,0,1,1,1,0,1,1,0,2,2,2,2,2,2,0],
        [0,0,2,0,0,0,0,1,1,1,1,0,1,2,2,2,2,2,2,0],
        [0,2,2,2,1,1,0,0,0,1,1,0,0,2,2,2,2,0,0,0],
        [0,2,2,2,2,1,1,1,0,0,0,0,1,2,2,2,0,0,0,0],
        [0,2,2,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    mapBg: "../assets/img/goblin-forest-01.png",
    height: 1280,
    width: 1280,
    initialCharPositionX: 9,
    initialCharPositionY: 18,
    mapPositionX: 384,
    mapPositionY: 960,
    bossIsKilled: false,
    checkRespawn(positionX, positionY){
        
        if(this.respawnMap[positionY][positionX] == 1) {
            const random = Math.random() * 100;
            if(random > 90) {
                return new Goblin()
            }
        } 
        if(this.respawnMap[positionY][positionX] == 2) {
            const random = Math.random() * 100;
            if(random > 90) {
                return new GoblinSoldier()
            }
        }
        if(this.respawnMap[positionY][positionX] == 3) {
            const random = Math.random() * 100;
            if(random > 90) {
                return new GoblinCaptain()
            }
        }
        if(this.respawnMap[positionY][positionX] == 9) {
            // const random = Math.random() * 100;
            if(!this.bossIsKilled) {
                return new GoblinChief()
            }
        }
        return {
            name: ""
        }
    },
    checkAction(posX, posY) {
        
        if(this.map[posY-1][posX] == 4) {
            
            return {
                action: 3,
                buttonName: "Sell/Buy",
                itemsList: [
                    {
                        item: new SmallHealthPotion(),
                        price: 10
                    },
                    {
                        item: new SmallManaPotion(),
                        price: 10
                    },
                    {
                        item: new SteelSword(),
                        price: 80
                    },
                    {
                        item: new ChainArmor(),
                        price: 70
                    },
                ]
            }
        } else if(this.map[posY+1][posX] == 2){
            return {
                action: 2,
                buttonName: "Enter",
                mapToEnter: map01,
                charPositionX: 7,
                charPositionY: 3,
            }
        } else {
            return {
                action: 0
            }
        }
    }
}