import { clientInstance } from "../../main.js";
import { BattleScreeen } from "../../ui/screens/battle.js";
import { Overlay } from "../../ui/screens/overlay.js";
import Util from "../../util.js";

export class BattleManager {
    

    startBattle = () => {
        clientInstance.uiManager.setScreen(new BattleScreeen());
        this.init();
    }
    endBattle = () => {
        clientInstance.uiManager.setScreen(new Overlay());
    }

    init = (name1, name2) => {
        console.log(name1)
        console.log(name2)
        this.image1 = Util.loadImage(Util.getCharacterImageLocation(name1));
        this.image2 = Util.loadImage(Util.getCharacterImageLocation(name2));
    }

    initUI = () => {
        //loads all the ui images
    }

    drawUI = () => {
        // if(this.image1)
        // clientInstance.canvas.ctx.drawImage(this.image1, window.innerWidth/2-64, innerHeight/2, 128,128)
        // if(this.image2)
        // clientInstance.canvas.ctx.drawImage(this.image2, window.innerWidth/2+64, window.innerHeight/2, 128, 128)
    }
}