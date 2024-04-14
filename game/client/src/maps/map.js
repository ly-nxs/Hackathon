
import { clientInstance } from "../main.js";
import Util from "../util.js";
import { createMap } from "./mapv3.js";
import { init } from "./mapv4.js";

export class GameMap {
    //THIS IS A CLASS OBJECT OF A MAP
    //NAME IS THE NAME OF THE MAP USED FOR MAP TRANSITIONS
    //TELEPORTS IS THE ARRAY OF TELEPORTS THAT THE MAP HAS
    //INIT MAP INITS THE VARIABLES
    //INITTILE MAP INITS THE VISUALS PRETTY MUCH
    //LOOK TO MAP MANAGER TO
    constructor(location, teleports,npcs) {
        this.name=location;
        this.initMap(location);
        this.teleports = teleports;
        this.npcs = npcs
        
    }

    initMap = async (location) => {
        const { mapData, mapWidth, mapHeight, tileSize, canvas, ctx, collision } = await init(Util.getMapDataLocation(location+".json"));
        this.mapData = mapData;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileSize = tileSize;
        this.canvas = canvas;
        this.ctx = ctx;
        this.collision = collision;
    }

    initTileMap = async (location) => {
        this.tileMap = await createMap(Util.getMapDataLocation(location+".json"));
    }

    
  drawSky = () => {
    if(!this.tileMap) return;
    const sky = this.mapData.layers.find((item) => item.name === "sky");
    for (let y = 0; y < this.mapHeight; y++) {
        for (let x = 0; x < this.mapWidth; x++) {
            let index = sky.data[x + y * sky.width];
            if (index == 0) continue;
            const position = this.indexToXY(index);
            clientInstance.canvas.ctx.drawImage(this.tileMap.tileCanvas, position.x * this.tileSize , position.y * this.tileSize , this.tileSize, this.tileSize, x * this.tileSize+clientInstance.player.getCenterX() , y * this.tileSize+clientInstance.player.getCenterY() , this.tileSize , this.tileSize);
        }
    }
  }

    drawMap = () => {
    //console.log(mapData.layers)
    if(!this.tileMap) return;
    this.mapData.layers.forEach(layer => {
        if(layer.name=="sky") return;
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                let index = layer.data[x + y * layer.width];
                if (index == 0) continue;
                const position = this.indexToXY(index);
                clientInstance.canvas.ctx.drawImage(this.tileMap.tileCanvas, position.x * this.tileSize , position.y * this.tileSize , this.tileSize, this.tileSize, x * this.tileSize+clientInstance.player.getCenterX() , y * this.tileSize+clientInstance.player.getCenterY() , this.tileSize , this.tileSize);
            }
        }
      });
}

    indexToXY = (index) => {
    const tileMapWidth=10
    const x=index%tileMapWidth;
    const y=Math.floor(index/tileMapWidth)
    return {x, y}
    }
    
}