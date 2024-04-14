import Util from "../util.js";

const initialTileOffset=1;
const tileMapWidth = 10; 

export const createMap = async (importMap) => {
    const mapData = await fetchMapData(importMap);
    const tileSize = mapData.tileheight;
    
    //calculate total tiles and create the canvas
    const mapTotalTiles = await getTotalTileCountOfTilesets(mapData.tilesets);
    const { canvas: tileCanvas, ctx: tileCtx } = createCanvas(tileSize,mapTotalTiles);
    document.body.appendChild(tileCanvas);

    //render the tilemaps to the canvas
    const images=await loadTilesetImages(mapData.tilesets);
    renderImagestoCanvas(images,tileCanvas,tileCtx,tileSize)

    //create the animation frame canvas
    const totalFrames = calculateTotalAnimationFrames(images);
    //console.log(totalFrames)
    const { canvas: frameCanvas, ctx: frameCtx } = createCanvas(tileSize,totalFrames);
    document.body.appendChild(frameCanvas);

    await renderAnimationFrames(images,frameCtx,tileCanvas,tileSize)

    setInterval(() => {
        renderFramesToTileset(tileCtx,images,frameCanvas,tileSize);
    },50)

    return { mapData, tileSize, tileCanvas, tileCtx };
};

const fetchMapData = async (importMap) => {
    const map = await fetch(importMap);
    return map.json();
};

const createCanvas = (tileSize,totalTiles) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    canvas.width=tileMapWidth*tileSize;
    canvas.height=Math.ceil(totalTiles/tileMapWidth)*tileSize;
    //console.log("CANVAS HEIGHT =",Math.ceil(totalTiles/tileMapWidth)*tileSize)
    //canvas.style.display = "none";
    return { canvas, ctx };
};

const renderImagestoCanvas = (images,canvas,ctx,tileSize) => {
    let index=initialTileOffset;
    images.forEach(image => {
    let imageIndex=initialTileOffset;
    const imageMapWidth = image.width/tileSize;
    const imageMapHeight = image.height/tileSize;
    for(let y=0; y<imageMapHeight; y++){
        for(let x=0; x<imageMapWidth;x++){
            if(imageIndex>image.tilecount) return;
            const position = indexToXY(index);
            ctx.drawImage(image,x*tileSize,y*tileSize,tileSize,tileSize,position.x*tileSize,position.y*tileSize,tileSize,tileSize)
            index++;
            imageIndex++
        }
    }
})
}

const indexToXY = (index) => {
    const x=index%tileMapWidth;
    const y=Math.floor(index/tileMapWidth)
    return {x, y}
}

const getTilesetData = async (tilesetXML) => {
    const response = await fetch(Util.getTilesetDataLocation(tilesetXML.source));
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data,"text/xml");
    const header = xmlDoc.getElementsByTagName("tileset")[0];
    return {xmlDoc, header}
}

const getTileCountOfTileset = async (tilesetXML) => {
    let tilesetData = await getTilesetData(tilesetXML);
    return parseInt(tilesetData.header.getAttribute("tilecount"));
}

const getTotalTileCountOfTilesets = async (tilesets) => {
    let total=0;
    for (const tileset of tilesets) {
        total += await getTileCountOfTileset(tileset);
    }
    return total;
}

const renderFramesToTileset = (tileCtx,images,frameCanvas,tileSize) => {
    images.forEach(image => {
        image.animation.forEach(animation => {
            const frame = animation.frames[animation.currentFrame]
            frame.durationRemaining-=50;
            if(frame.durationRemaining<=0){
                frame.durationRemaining=frame.duration;
                let fromLocation = indexToXY(frame.frameIndex)
                let location =indexToXY(image.startingTile + animation.id)
                //console.log(frame)

                    tileCtx.clearRect(location.x*tileSize,location.y*tileSize,tileSize,tileSize)
                    tileCtx.drawImage(frameCanvas,fromLocation.x*tileSize,fromLocation.y*tileSize,tileSize,tileSize,location.x*tileSize,location.y*tileSize,tileSize,tileSize)
                //console.log(frameCanvas,fromLocation.x*tileSize,fromLocation.y*tileSize,tileSize,tileSize,location.x*tileSize,location.y*tileSize,tileSize,tileSize)
                animation.currentFrame++;
                if(animation.currentFrame>=animation.frames.length)
                animation.currentFrame=0;
            }
        })
    })
}

const renderAnimationFrames = (images,newCtx,oldCanvas,tileSize) => {
    let index=0;
    images.forEach(image => {
        image.animation.forEach(animation => {
            animation.frames.forEach(frame => {
                const frameLocation = image.startingTile + parseInt(frame.frame);
                //console.log(frameLocation)
                let oldLocation = indexToXY(frameLocation);
                let newLocation = indexToXY(index);
                newCtx.drawImage(oldCanvas,oldLocation.x*tileSize,oldLocation.y*tileSize,tileSize,tileSize,newLocation.x*tileSize,newLocation.y*tileSize,tileSize,tileSize);
                index++;
            })
        })
    })

}
const getAnimationFrames = async (tilesetXML) => {
    let tilesetData = await getTilesetData(tilesetXML);
    const tiles = [...tilesetData.xmlDoc.getElementsByTagName("tile")];
    const tilesData = tiles.map(tileValue => {
        //for the animations do we need the animation too? or just all the frames? im not exactly sure!
        const id = parseInt(tileValue.getAttribute("id"));
        const values = tileValue.getElementsByTagName("frame");
        const frames = [...values].map(value => {
            const frame = value.getAttribute("tileid");
            const duration = value.getAttribute("duration");
            return { frame: parseInt(frame), duration: parseInt(duration), durationRemaining: parseInt(duration) };
        });
        return { id: id, currentFrame:0, frames: frames };
    });
    return tilesData;
}

const calculateTotalTiles = (tilesetData) => {
    return tilesetData.reduce((total, tileset) => total + tileset.tilecount, initialTileOffset);
};

const calculateTotalAnimationFrames = (images) => {
    return images.reduce((total, image) => {
        return total + image.animation.reduce((animationTotal, animation) => {
            return animationTotal + animation.frames.length;
        }, 0);
    }, 0);
};

const loadTilesetImages = async (tilesets) => {
    const loadImagePromises = tilesets.map(async tileset => {
        try {
             const tilecount= await getTileCountOfTileset(tileset)
             const animation = await getAnimationFrames(tileset)
             let frameIndex=0;
             animation.forEach(animationElement => {
                animationElement.frames.forEach(frame => {
                    frame["frameIndex"]=frameIndex;
                    frameIndex++
                })
             })
             //console.log("animation",animation)
             const image = await Util.loadImage(Util.getMapImageLocation(tileset.source.replace('.tsx', '.png'))); 
             image["tilecount"]=tilecount;
             image["animation"]=animation;
             image["startingTile"]=tileset.firstgid;
             return image
            } 
        catch (error) { console.error(error); }
    });
    return Promise.all(loadImagePromises);
};