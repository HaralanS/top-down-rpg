export class Strike {
    name = "Strike";
    type = "hit";
    manaCost = 10;
    level = 1;
    skillCost = 1;
    info = "Guarantees a hit and deals double normal damage";
    img = "../assets/img/strike.png";


    attack(hero, random){
        hero.setEquippmentStats()        
        const damage = hero.totalAttack * 2 + hero.totalStrength + Math.ceil(hero.totalStrength);
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
    skillCost = 5;
    info = "Inflicts a bleed equal to your total attack stat value for 3 turns";
    img = "../assets/img/inflict-wound.png";
    
    effect(hero){
        return {
        type: "bleeding",
        turns: 3,
        damage: hero.totalAttack
        }
    }
}