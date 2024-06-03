import { Goblin } from "./monsters.js";

export const map01 = {
    map: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,5,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,0,3,0,0,1,1,1,1,4,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,6,6,6,6,6,6,1,1,1,1,1,1,1,0],
        [0,6,6,6,6,6,6,1,1,1,1,1,1,1,0],
        [0,6,6,6,6,6,6,1,1,1,1,1,1,1,0],
        [0,6,6,6,6,6,6,1,1,1,1,1,1,1,0],
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
    }
}