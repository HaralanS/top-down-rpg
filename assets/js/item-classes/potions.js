export class SmallHealthPotion {
    name = "Small Health Potion";
    type = "potion";
    lifeRegen = 50;
    sellingPrice = 2;
    stackable = true;
    quant = 1;
    action = "drink";
    img = "../assets/img/small-life-potion.png";
    info = "This potion heals 50 life points.";

    drink(hero){
        if(this.quant > 0) {
            hero.life = Math.min(hero.totalMaxLife, (hero.life + 50));
            this.quant--;
        }
    }
}
export class SmallManaPotion {
    name = "Small Mana Potion";
    type = "potion";
    manaRegen = 50;
    sellingPrice = 2;
    stackable = true;
    quant = 1;
    action = "drink";
    img = "../assets/img/small-mana-potion.png";
    info = "This potion regenerates 50 mana points.";

    drink(hero){
        if(this.quant > 0) {
            hero.mana = Math.min(hero.totalMaxMana, (hero.mana + 50));
            this.quant--;
        }
    }
}