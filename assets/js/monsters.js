import { RedApple } from "./item-classes/food.js";
import { GoblinEar } from "./item-classes/quest-items.js";
import { Mace, WoodenSword } from "./item-classes/weapons.js";

export class Goblin {
    name = "Goblin";
    life = 50;
    maxLife = 50;
    experience = 10;
    img = "../assets/img/goblin-01-Sheet-export.png";
    // hitImg = "../assets/img/goblin-hit-01.png";
    // attackImg = "../assets/img/goblin-attack-01.png";
    // deadImg = "../assets/img/goblin-dead-01.png";

    dropGold(){
        return Math.ceil(3 + Math.random() * 6);
    }
    attack() {
        const random = Math.random() * 100;
        if (random < 80) {
            return 5 + Math.ceil(Math.random() * 7);
        } else if (random < 90) {
            return (5 + Math.ceil(Math.random() * 7)) * 2;
        } else {
            return 0;
        }
    }
    takeDamage(damage) {
        this.life = Math.max(0, (this.life - damage));
    }
    
    dropItems() {
        const loot = [];
        if(Math.random() * 100 > 90) {
           loot.push(new WoodenSword())
        }
        if(Math.random() * 100 > 20) {
            
            loot.push(new RedApple())
        }
        if(Math.random() * 100 > 10) {
            
            loot.push(new GoblinEar())
        }
        return loot;
    }
}

export class GoblinSoldier {
    name = "Goblin Soldier";
    life = 90;
    maxLife = 90;
    experience = 15;
    img = "../assets/img/goblin-soldier-sprite-sheet-01.png";
    // hitImg = "../assets/img/goblin-hit-01.png";
    // attackImg = "../assets/img/goblin-attack-01.png";
    // deadImg = "../assets/img/goblin-dead-01.png";

    dropGold(){
        return Math.ceil(3 + Math.random() * 8);
    }
    attack() {
        const random = Math.random() * 100;
        if (random < 80) {
            return 6 + Math.ceil(Math.random() * 9);
        } else if (random < 90) {
            return (6 + Math.ceil(Math.random() * 9)) * 2;
        } else {
            return 0;
        }
    }
    takeDamage(damage) {
        this.life = Math.max(0, (this.life - damage));
    }
    
    dropItems() {
        const loot = [];
        
        if(Math.random() * 100 > 90) {
            loot.push(new Mace())
         }
        if(Math.random() * 100 > 20) {
            
            loot.push(new RedApple())
        }
        if(Math.random() * 100 > 10) {
            
            loot.push(new GoblinEar())
        }
        return loot;
    }
}
