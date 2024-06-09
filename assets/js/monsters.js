import { PlateArmor } from "./item-classes/armors.js";
import { RedApple } from "./item-classes/food.js";
import { GoblinChiefHead, GoblinEar, PieceOfGoblinArmor, PieceOfGoblinHelmet } from "./item-classes/quest-items.js";
import { SmallRingOfEndurance } from "./item-classes/rings.js";
import { BattleAxe, Mace, WoodenSword } from "./item-classes/weapons.js";

export class Goblin {
    name = "Goblin";
    life = 50;
    maxLife = 50;
    experience = 10;
    img = "../assets/img/goblin-01-Sheet-export.png";
    isBoss = false;
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
    isBoss = false;
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
            
            loot.push(new PieceOfGoblinArmor())
        }
        
        return loot;
    }
}

export class GoblinCaptain {
    name = "Goblin Captain";
    life = 125;
    maxLife = 125;
    experience = 20;
    img = "../assets/img/goblin-captain-01.png";
    isBoss = false;

    dropGold(){
        return Math.ceil(4 + Math.random() * 10);
    }
    attack() {
        const random = Math.random() * 100;
        if (random < 85) {
            return 7 + Math.ceil(Math.random() * 11);
        } else if (random < 92) {
            return (7 + Math.ceil(Math.random() * 11)) * 2;
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
            loot.push(new SmallRingOfEndurance())
         }
        if(Math.random() * 100 > 20) {
            
            loot.push(new RedApple())
        }
        if(Math.random() * 100 > 10) {
            
            loot.push(new PieceOfGoblinHelmet())
        }
        
        return loot;
    }
}

export class GoblinChief {
    name = "Goblin Chief";
    life = 250;
    maxLife = 250;
    experience = 150;
    img = "../assets/img/goblin-chief-sprite-01.png";
    isBoss = true;

    dropGold(){
        return Math.ceil(15 + Math.random() * 30);
    }
    attack() {
        const random = Math.random() * 100;
        if (random < 85) {
            return 10 + Math.ceil(Math.random() * 16);
        } else if (random < 95) {
            return (10 + Math.ceil(Math.random() * 16)) * 2;
        } else {
            return 0;
        }
    }
    takeDamage(damage) {
        this.life = Math.max(0, (this.life - damage));
    }
    
    dropItems() {
        const loot = [];
        
        
        if(Math.random() * 100 > 20) {
            
            loot.push(new RedApple())
        }
       
        loot.push(new GoblinChiefHead())
       
        loot.push(new PlateArmor())
        
        return loot;
    }
}
