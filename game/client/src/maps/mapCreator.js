import Util from "../util.js";
//because 0 represents nothing in tiled, the first tile actually starts at 1, used to get correct total height and start index for render tilemap
const initalOffset = 1;

const tileMapWidth = 10;
let tileMapHeight = 0;
let images = [];
let tileSize=0;
let canvas;
let ctx;
let canvas2;
let ctx2;

export const createMap = async (importMap) => {
    const map = await fetch(importMap);
    const mapData = await map.json();
    tileSize = mapData.tileheight;
    canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.background = "red";
    canvas.style.display = "none";
    canvas.id = "tileset";
    console.log(tileMapHeight)
    await getImages(mapData)
    await getImageDatas(mapData)
    
    // for (let y = 0; y < tileMapHeight; y++) {
    //     for (let x = 0; x < tileMapWidth; x++) {
    //         this.ctx.drawImage(image, offsetX, offsetY, tileSize, tileSize, xMap * tileSize, yMap * tileSize, tileSize, tileSize);
    //         //this.ctx.fillText((yMap*12+xMap),xMap * tileSize, yMap * tileSize)
    //     }
    // }
    canvas.width = tileMapWidth * tileSize;
    canvas.height = tileMapHeight * tileSize;
    document.body.appendChild(canvas);
    await renderTileMap();
    createAnimationFrames();

    setInterval(() => {
        loadAnimationstoCanvas();
    },50)
}

const loadAnimationstoCanvas = () => {
    images.forEach(image => {
        image.animation.forEach(animation => {
            //console.log(image)
            let frame = animation.frames[animation.currentframe]
                frame.durationRemaining-=50;
                //console.log(frame,frame.durationRemaining)
                if(frame.durationRemaining<=0){
                    frame.durationRemaining=frame.duration;
                    //console.log(animation)
                    let fromLocation = indexToXY(frame.canvas2Index)
                    let location =indexToXY(image.start+animation.id)
                    //console.log(image.start,animation.id)
                    //if(fromLocation.x==0 && fromLocation.y==1){
                    ctx.clearRect(location.x*tileSize,location.y*tileSize,tileSize,tileSize)
                    ctx.drawImage(canvas2,fromLocation.x*tileSize,fromLocation.y*tileSize,tileSize,tileSize,location.x*tileSize,location.y*tileSize,tileSize,tileSize)
                    //ctx.strokeStyle = "green";
                    //ctx2.strokeRect(fromLocation.x*tileSize,fromLocation.y*tileSize,tileSize,tileSize);
                    //ctx.strokeRect(location.x*tileSize,location.y*tileSize,tileSize,tileSize);
                    //console.log(fromLocation,location)
                    //}
                    animation.currentframe++;
                    if(animation.currentframe>=animation.frames.length)
                    animation.currentframe=0;
                }

        })
    })
}

const createAnimationFrames = () => {
    let totalFrames=0;
    images.forEach(image => {
        image.animation.forEach(animation => {
            totalFrames+=animation.frames.length;
        })
    })

    let canvas2Height = Math.ceil(totalFrames/tileMapWidth);


    canvas2 = document.createElement('canvas');
    ctx2 = canvas2.getContext("2d");
    canvas2.style.position = "absolute";
    canvas2.style.top = "0";
    canvas2.style.left = "320px";
    canvas2.style.background = "blue";
    canvas2.id = "tileset2";
    canvas2.style.display = "none";
    canvas2.width = tileMapWidth * tileSize;
    canvas2.height = canvas2Height * tileSize;
    document.body.appendChild(canvas2);
    //for(let i=0)
    let canvas2Index=0;
    images.forEach(image => {
        let start = image.start;
        image.animation.forEach(animation => {
            animation["currentframe"]=0;
            animation.frames.forEach(frame => {
                let index = start + parseInt(frame.frame);
                frame["canvas2Index"]=canvas2Index;
                //console.log(frame, animation)
                frame["durationRemaining"]=frame.duration;

                let location = indexToXY(index);
                let newLocation = indexToXY(canvas2Index);
                ctx2.drawImage(canvas,location.x*tileSize,location.y*tileSize,tileSize,tileSize,newLocation.x*tileSize,newLocation.y*tileSize,tileSize,tileSize);
                //console.log(image.image,location.x*tileSize,location.y*tileSize,tileSize,tileSize,newLocation.x*tileSize,newLocation.y*tileSize,tileSize,tileSize)
                canvas2Index++;
            })

        })
    })
}

const renderTileMap = () => {
    let index=initalOffset;

        images.forEach(image => {
            let img = image.image;
            const imageMapWidth = img.width/tileSize;
            const imageMapHeight = img.height/tileSize;
            for(let y=0; y<imageMapHeight; y++){
                for(let x=0; x<imageMapWidth;x++){
                    //console.log(image,index)
                    if(!(index>image.tilecount)){
                    const position = indexToXY(index);
                    ctx.drawImage(img,x*tileSize,y*tileSize,tileSize,tileSize,position.x*tileSize,position.y*tileSize,tileSize,tileSize);
                    index++;
                    }
                }
            }

        })
}

const indexToXY = (index) => {
    //% gets remainder and remainder of the rows gives the x position
    const x=index%tileMapWidth;
    //division gets the height and floor gets the correct height
    const y=Math.floor(index/tileMapWidth)
    return {x, y}
}

const getImages = async (mapData) =>{
    images = [];

    for (const tileset of mapData.tilesets) {
        try {
            const image = await Util.loadImage(Util.getMapImageLocation(tileset.source.replace('.tsx', '.png')));
            images.push(
                {start: tileset.firstgid
                    , image: image}
                );
        } catch (error) {
            console.error(error);
        }
    }

    console.log(images);
}

const getImageDatas = async (mapData) => {
    tileMapHeight=0;
    const parser = new DOMParser();
    let totalTiles=initalOffset;
// Define an array to store all the promises
const fetchPromises = mapData.tilesets.map(async tileset => {
    console.log(tileset.source);
    const response = await fetch(Util.getTilesetDataLocation(tileset.source));
    const data = await response.text();

    const xmlDoc = parser.parseFromString(data,"text/xml");
    const header = xmlDoc.getElementsByTagName("tileset")[0];
    const tilecount = parseInt(header.getAttribute("tilecount"));
    totalTiles += tilecount;
    console.log(tilecount,"COUNT!")
    console.log(images)
    const tiles = xmlDoc.getElementsByTagName("tile");
    const tilesArray = [...tiles];

    const tilesData = tilesArray.map(tileValue => {
        const id = parseInt(tileValue.getAttribute("id"));
        const values = tileValue.getElementsByTagName("frame");
        const frames = [...values].map(value => {
            const frame = value.getAttribute("tileid");
            const duration = value.getAttribute("duration");
            return { frame: parseInt(frame), duration: parseInt(duration) };
        });
        return { id: id, frames: frames };
    });

    //console.log(tilesData);
    return { tilecount, tilesData };
});

// Wait for all the promises to resolve
await Promise.all(fetchPromises).then(animationsData => {
    for(let i=0;i<animationsData.length;i++){
        images[i]["animation"]=animationsData[i].tilesData;
        images[i]["tilecount"]=0
        for(let e=0;e<=i;e++){
            images[i]["tilecount"]+=animationsData[e].tilecount;
        }
    }
    console.log(images,"IMAGES UPDATED")
});

console.log("total tiles:", totalTiles);
console.log(Math.ceil(totalTiles/tileMapWidth))
tileMapHeight=Math.ceil(totalTiles/tileMapWidth);
}
