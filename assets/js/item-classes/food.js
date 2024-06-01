export class RedApple {
    name = "Red Apple";
    type = "food";
    lifeRegen = 10;
    manaRegen = 5;
    sellingPrice = 1;
    stackable = true;
    quant = 1;
    action = "eat";
    img = "../assets/img/red-apple.png";
    info = "This fruit regenerates 10 life points and 5 mana points.";

    eat(hero){
        if(this.quant > 0) {
            hero.life = Math.min(hero.totalMaxLife, (hero.life + 10));
            hero.mana = Math.min(hero.totalMaxMana, (hero.mana + 5));
            this.quant--;
        }
    }
}