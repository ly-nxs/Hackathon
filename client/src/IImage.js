import { clientInstance } from "./main.js";
import Util from "./util.js";

export class IImage {
    constructor(src) {
        this.loaded = false;
        this.init(src);
    }

    init = async (src) => {
        this.imgElement = await Util.loadImage(Util.getCharacterImageLocation(src));
        this.loaded = true;
        return;
    }

    draw(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        if (this.loaded) {
            //console.log(this.imgElement)
            clientInstance.canvas.ctx.drawImage(this.imgElement, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
    }
}