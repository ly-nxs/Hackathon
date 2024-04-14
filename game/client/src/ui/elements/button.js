import { clientInstance } from "../../main.js";
import Util from "../../util.js";
import Element from "./element.js";

class Button extends Element{
    constructor(text, clickMethod, x, y, width, height,backgroundColor,offset,fontColor) {
        super(x, y, width, height);
        this.text=text;
        this.clickMethod = clickMethod;
        this.backgroundColor = backgroundColor || 'black'
        this.fontColor = fontColor || 'black'
        this.offset = offset || 0
        this.init();    
    }

    init = async () => {
        this.image = await Util.loadImage(Util.getImageLocation("woodbutton.png"))
    }

    draw = () => {
        let ctx = clientInstance.canvas.ctx;
        ctx.fillStyle= this.fontColor;
        ctx.font = "30px FutilePro";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        //aligns to text to the center 
        if(this.image)
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.fillStyle= this.fontColor;
        ctx.fillText(this.text, this.x+this.width/2+this.offset, this.y+this.height/2); 
        
    }
    animation( ) {      
        
        
    }


    onClick = (e) => {
        clientInstance.audioManager.buttonClick.click.play();

        this.clickMethod(e);
    }
    
}

export default Button;