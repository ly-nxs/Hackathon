export class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        this.resize()
    }

    resize = () => {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight
    }

    getCanvas = () => {
        return this.canvas;
    }
}