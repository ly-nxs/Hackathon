
const tileMapWidth=10

export const init = async (jsonLocation) => {
    

    const map = await fetch(jsonLocation);
    const mapData = await map.json();
    const mapWidth=mapData.width;
    const mapHeight=mapData.height;
    const tileSize=mapData.tileheight;
    const collision= mapData.layers.find((item) => item.name === "collision");
    
    console.log(collision,mapWidth,tileSize)
    const {canvas, ctx} = createCanvas(mapWidth,mapHeight,tileSize)
    //document.body.appendChild(canvas)

    return {mapData,mapWidth,mapHeight,tileSize,canvas,ctx,collision}
}

const createCanvas = (width,height,tileSize) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    //console.log("CANVAS HEIGHT =",Math.ceil(totalTiles/tileMapWidth)*tileSize)
    //canvas.style.display = "none";
    return { canvas, ctx };
}

export const drawMap = (mapData,width,height,renderCtx,tileCanvas,tileSize, ) => {
    //console.log(mapData.layers)
    mapData.layers.forEach(layer => {

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = layer.data[x + y * layer.width];
                if (index == 0) continue;
                const position = indexToXY(index);
                renderCtx.drawImage(tileCanvas, position.x * tileSize , position.y * tileSize , tileSize, tileSize, x * tileSize , y * tileSize , tileSize , tileSize );
            }
        }
      });
}

export const drawSky = (mapData,width,height,renderCtx,tileCanvas,tileSize) => {
    const sky = mapData.layers.find((item) => item.name === "sky");
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = sky.data[x + y * sky.width];
            if (index == 0) continue;
            const position = indexToXY(index);
            renderCtx.drawImage(tileCanvas, position.x * tileSize , position.y * tileSize , tileSize, tileSize, x * tileSize , y * tileSize , tileSize , tileSize );
        }
    }
}

const indexToXY = (index) => {
    const x=index%tileMapWidth;
    const y=Math.floor(index/tileMapWidth)
    return {x, y}
}