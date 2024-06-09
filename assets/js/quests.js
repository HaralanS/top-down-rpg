import { HunterArmor } from "./item-classes/armors.js";
import { GoblinChiefHead, GoblinEar, PieceOfGoblinArmor, PieceOfGoblinHelmet } from "./item-classes/quest-items.js";
import { KnightAmulet } from "./item-classes/trinkets.js";
import { BattleAxe, Sabre } from "./item-classes/weapons.js";

export class GoblinHunter {
    name = "Goblin Hunter";
    type = "gathering";
    completed = false;
    itemsReward = [new HunterArmor()];
    goldReward = 20;
    xpReward = 50;
    questItem = new GoblinEar();
    quant = 10;
    level = 1;
    description = "We are having a problem with goblins in our village, southwest of here there's a place with taller and darker grass where they can hide and make their attacks and pillages, if you go there to hunt them and bring me at least 10 goblin ears I can reward you with a good armor for future adventures.";
    isCompletedAsking = "Have you collected all the goblin ears?";
    completedText = "Thank you so much! We appreciate your effort to make our village safer!";
}

export class KeepTheGoblinsAway {
    name = "Keep the goblins away";
    type = "gathering";
    completed = false;
    itemsReward = [new Sabre()];
    goldReward = 25;
    xpReward = 70;
    questItem = new PieceOfGoblinArmor();
    quant = 8;
    level = 2;
    description = "We need help to fight some goblin soldiers that are getting near our north gate, you can find them in the forest. Take care in the Goblins Forest, only the trail is safe and the deeper you go there the stronger the goblins will be, you can go until the south side of the river, if you cross the bridge you'll have to deal with much stronger of those green monsters. Bring us 8 Pieces of Goblin Armors and I'll reward you with a fine sword and some gold.";
    isCompletedAsking = "Have you collected all the goblin ears?";
    completedText = "Thank you so much! We appreciate your effort to make our village safer!";
}

export class KillTheCaptains {
    name = "Kill the captains";
    type = "gathering";
    completed = false;
    itemsReward = [new KnightAmulet()];
    goldReward = 40;
    xpReward = 125;
    questItem = new PieceOfGoblinHelmet();
    quant = 5;
    level = 4;
    description = "Looks like the goblin gang are much more organized then what we thought at first, but we now know the location of their captains. You need to go north on their forest and cross the bridge, there's no trail there, so you can find them everywhere on the north side of the river. Bring me 5 pieces of goblin helmets and I'll know killed a good amount of their captains and I'll reward you with an amazing amulet.";
    isCompletedAsking = "Have you collected all the goblin ears?";
    completedText = "Thank you so much! We appreciate your effort to make our village safer!";
}
export class BringMeTheHead {
    name = "Bring me the head";
    type = "gathering";
    completed = false;
    itemsReward = [new BattleAxe()];
    goldReward = 60;
    xpReward = 200;
    questItem = new GoblinChiefHead();
    quant = 1;
    level = 6;
    description = "This is our chance! Their defense lines are a mess without their main captains, cross the river and go west until you get in the end of the forest, you gonna find the goblin chief there. Kill him and bring me the head and I will reward you with a Batlle Axe and a good amount of gold.";
    isCompletedAsking = "Have you collected all the goblin ears?";
    completedText = "Thank you so much! We appreciate your effort to make our village safer!";
}