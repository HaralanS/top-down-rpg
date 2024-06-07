export class Strike {
    name = "Strike";
    type = "hit";
    manaCost = 10;
    level = 1;
    skillCost = 2;
    info = "Guarantees a hit and deals double normal damage";
    img = "../assets/img/strike.png";


    attack(hero){
        const random = Math.random() * 100;
        hero.mana -= this.manaCost;
        hero.setEquippmentStats()        
        const damage = hero.totalAttack + Math.ceil(Math.random() * hero.totalStrength);
        if(random < hero.totalCritical) {
            return damage * 4;
        } else {
            return damage * 2;
        }
    }

}
export class InflictWound {
    name = "Inflict Wound";
    type = "effect";
    manaCost = 15;
    level = 1;
    skillCost = 4;
    info = "Inflicts a bleed equal to your total attack stat value for 4 turns";
    img = "../assets/img/inflict-wound.png";
    
    effect(hero){
        hero.mana -= this.manaCost;
        return {
        type: "bleeding",
        turns: 4,
        damage: hero.totalAttack
        }
    }
}