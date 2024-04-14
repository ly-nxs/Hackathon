import { clientInstance } from '../../main.js';
import Util from '../../util.js';
import Element from './element.js';

export class TextElement extends Element {
    constructor(text, x, y, width, height, fontColor) {
        super(x, y, width, height);
        this.text =text;

        this.fontColor = fontColor || 'black'
        
    }

    draw = () => {
        let ctx = clientInstance.canvas.ctx;
        clientInstance.canvas.ctx.fillStyle= this.fontColor;
        ctx.font = "100px FutilePro";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y,this.width); 
    }

}