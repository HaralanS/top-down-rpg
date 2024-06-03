import { RedApple } from "./item-classes/food.js";
import { WoodenSword } from "./item-classes/weapons.js";

export class Goblin {
    name = "Goblin";
    life = 50;
    maxLife = 50;
    experience = 50;
    img = "../assets/img/goblin-01.png";
    // hitImg = "../assets/img/goblin-hit-01.png";
    // attackImg = "../assets/img/goblin-attack-01.png";
    // deadImg = "../assets/img/goblin-dead-01.png";

    dropGold(){
        return Math.ceil(3 + Math.random() * 12);
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
        return loot;
    }
}
