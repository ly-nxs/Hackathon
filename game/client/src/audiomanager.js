
export class AudioManager {
    constructor () {
        this.initbool=false;
    }

    init = () => {
        if(this.initbool) return;
        this.initbool=true;
        this.buttonClick = {
            click: new Howl({
                src:'../../resources/audio/click.ogg',
                volume: 0.15,
            })
        }
    
    }

    

}