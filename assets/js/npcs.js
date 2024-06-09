import { BringMeTheHead, GoblinHunter, KeepTheGoblinsAway, KillTheCaptains } from "./quests.js";

export class VillageChief {
    name = "Howard";
    type = "quest-guiver";
    questList = [new GoblinHunter(), new KeepTheGoblinsAway(), new KillTheCaptains(), new BringMeTheHead()];
    faceImg = "../assets/img/village-chief-01.png";

    initialText(hero){
        return `Hi ${hero.name}! Is not easy to manage and take care of our village. Can you help me?`
    }


}