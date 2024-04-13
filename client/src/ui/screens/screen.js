
export default class Screen {
    
    constructor() {
        this.elements = [];
        this.images = [];
    }

    addElement = (element) => {
        element.init();
        this.elements.push(element);
        console.log(this.elements)
    }

    

    addImage = (image) => {
        this.images.push(image);
    }

    addImage = (image) => {
        this.images.push(image);
    }

    init = () => {

    }

    update = () => {
        this.elements.forEach(element => {
            element.update();
        })
    }

    draw = () => {
        this.elements.forEach(element => {
            element.draw();
            element.update();
        })
    
    }

    onClick = (e) => {
        this.elements.forEach(element => {
            if(e.x>element.x && e.y>element.y && e.x<element.x+element.width && e.y<element.y+element.height)
            element.onClick(e);
        })
    }

    mouseMove = (e) => {
        
    }

    keyType = (e) => {
        
    }

    

    
}