import { RedApple } from "./item-classes/food.js";
import { WoodenSword } from "./item-classes/weapons.js";

export class Goblin {
    name = "Goblin";
    life = 50;
    maxLife = 50;
    experience = 20;
    img = "../assets/img/goblin-01.png";
    // hitImg = "../assets/img/goblin-hit-01.png";
    // attackImg = "../assets/img/goblin-attack-01.png";
    // deadImg = "../assets/img/goblin-dead-01.png";

    dropGold(){
        return Math.ceil(3 + Math.random() * 12);
    }
    attack() {
        const random = Math.random() * 10;
        if (random < 8) {
            return 5 + Math.ceil(Math.random() * 10);
        } else if (random < 9) {
            return (5 + Math.ceil(Math.random() * 10)) * 2;
        } else {
            return 0;
        }
    }
    takeDamage(damage) {
        this.life = Math.max(0, (this.life - damage));
    }
    random(){
        Math.random() * 100
    }
    dropItem() {
        const loot = [];
        if(random() > 90) {
           loot.push(new WoodenSword())
        }
        if(random() > 60) {
            loot.push(new RedApple())
         }
         return loot;
    }
}
