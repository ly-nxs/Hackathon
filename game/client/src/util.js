class Util {
    static loadImage = (source) => {
      return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = source; });
    }


    static getImageLocation = (src) => {
      return "./resources/images/"+src;
    }
    static getItemImageLocation = (src) => {
      return "./resources/items/images/"+src+".png";
    }
    static getFontLocation = (src) => {
      return "./resources/fonts/"+src;
    }
    static getMapDataLocation = (src) => {
      return "./resources/maps/tilesetJson/"+src;
    }
    static getMapImageLocation = (src) => {
      return "./resources/maps/tilesetImages/"+src;
    }

    static getCharacterImageLocation = (src) => {
      return "./resources/characters/"+src;
    }
    static getTilesetDataLocation = (src) => {
      return "./resources/maps/tilesetData/"+src.split(".")[0]+".xml";
    }
    
}

export default Util;