import { clientInstance } from '../../main.js';
import Element from './element.js';
import Util from '../../util.js';

export class ImageElement extends Element {
    constructor(source, x,y,width, height) {
        super(x,y,width,height);
        // this.img = new Image();
        // this.img.src = source;
        this.source = source;

        this.init();
    }

    init = async () => {
        this.image = await Util.loadImage(Util.getImageLocation(this.source));

    }

    draw = () => {
        // const ctx = clientInstance.canvas.ctx;
        // ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

        if(this.image)
        clientInstance.canvas.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);

    }
}

