import { WoodenSword } from "./item-classes/weapons.js";
import { LeatherArmor } from "./item-classes/armors.js";
import { SmallPowerRing } from "./item-classes/rings.js";
import { SmallProtectionAmulet } from "./item-classes/trinkets.js";
import { InflictWound, Strike } from "./skills.js";

class Warrior {
    name = "Link";
    playerClass = "Warrior";
    level = 1;
    experience = 0;
    life = 100;
    maxLife = 100;
    mana = 50;
    maxMana = 50;
    strength = 5;
    gold = 20;
    img = "../assets/img/warrior-game-01.png";
    critical = 5;
    precision = 50;
    totalStrength = 5;
    totalCritical = 5;
    totalPrecision = 50;
    totalMaxLife = 100;
    totalMaxMana = 50;
    totalArmor = 0;
    totalAttack = 0;
    equippedWeapon = new WoodenSword();
    equippedArmor = new LeatherArmor();
    equippedTrinket = new SmallProtectionAmulet();
    equippedRing = new SmallPowerRing();
    inventory = [];
    skillPoints = 1;
    skills = [];
    skillsToChoose = [new Strike(), new InflictWound()];
    experienceList = [0, 100, 220, 365, 540, 750, 1000, 1300, 1660, 2090];
    
    setEquippmentStats() {
        this.totalStrength = this.strength + this.equippedWeapon.strength + this.equippedArmor.strength + this.equippedRing.strength + this.equippedTrinket.strength;
        this.totalCritical = this.critical + this.equippedWeapon.critical + this.equippedArmor.critical + this.equippedRing.critical + this.equippedTrinket.critical;
        this.totalPrecision = this.precision + this.equippedWeapon.precision + this.equippedArmor.precision + this.equippedRing.precision + this.equippedTrinket.precision;
        this.totalMaxLife = this.maxLife + this.equippedWeapon.maxLife + this.equippedArmor.maxLife + this.equippedRing.maxLife + this.equippedTrinket.maxLife;
        this.totalMaxMana = this.maxMana + this.equippedWeapon.maxMana + this.equippedArmor.maxMana + this.equippedRing.maxMana + this.equippedTrinket.maxMana;
        this.totalArmor = this.equippedWeapon.armor + this.equippedArmor.armor + this.equippedTrinket.armor + this.equippedRing.armor;
        this.totalAttack = this.equippedWeapon.attack + this.equippedTrinket.attack + this.equippedRing.attack;
    }
    attack(random) {
        this.setEquippmentStats()        
        const damage = this.totalAttack * 2 + this.totalStrength + Math.ceil(this.totalStrength);
        if(random < this.totalCritical) {
            return damage * 2;
        } else if (random < this.totalPrecision) {
            return damage;
        } else {
            return 0;
        }
    }
    takeDamage(damage){
        const damageTaken = Math.max(0, (damage - this.totalArmor));
        this.life = Math.max(0, (this.life - damageTaken));
    }
    levelUp(xp) {
        if (this.experience >= experienceList[9]) {
            
            if(this.experience - xp < 2090) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 10;
            this.strength = 23;
            this.maxLife = 235;
            this.maxMana = 95;
        } else if (this.experience >= experienceList[8]) {
            
            if(this.experience - xp < 1660) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 9;
            this.strength = 21;
            this.maxLife = 220;
            this.maxMana = 90;
        } else if (this.experience >= experienceList[7]) {
            
            if(this.experience - xp < 1300) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 8;
            this.strength = 19;
            this.maxLife = 205;
            this.maxMana = 85;
        } else if (this.experience >= experienceList[6]) {
            if(this.experience - xp < 1000) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 7;
            this.strength = 17;
            this.maxLife = 190;
            this.maxMana = 80;
        } else if (this.experience >= experienceList[5]) {
            if(this.experience - xp < 750) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 6;
            this.strength = 15;
            this.maxLife = 175;
            this.maxMana = 75;
        } else if (this.experience >= experienceList[4]) {
            if(this.experience - xp < 540) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 5;
            this.strength = 13;
            this.maxLife = 160;
            this.maxMana = 70;
        } else if (this.experience >= experienceList[3]) {
            if(this.experience - xp < 365) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 4;
            this.strength = 11;
            this.maxLife = 145;
            this.maxMana = 65;
        } else if (this.experience >= experienceList[2]) {
            if(this.experience - xp < 220) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 3;
            this.strength = 9;
            this.maxLife = 130;
            this.maxMana = 60;
        } else if (this.experience >= experienceList[1]) {
            if(this.experience - xp < 100) {
                this.life = Math.min(this.life + 15, this.totalMaxLife);
                this.mana = Math.min(this.mana + 5, this.totalMaxMana);
                this.skillPoints ++;
            }
            this.level = 2;
            this.strength = 7;this.life = Math.min(this.life + 15, this.totalMaxLife);
            this.mana = Math.min(this.mana + 5, this.totalMaxMana);
            this.maxLife = 115;
            this.maxMana = 55;
        }

    }

}

export default Warrior;