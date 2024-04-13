
export class AudioManager {
    constructor () {
        this.initbool=false;
    }

    init = () => {
        if(this.initbool) return;
        this.initbool=true;
        this.defaultMusic = {
            Map: new Howl({
                src: '',
                volume: 0.1,
            })
        }
        
    }

    

}