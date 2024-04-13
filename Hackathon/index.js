const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.length = 600;
let playX = 0;
let playY = 0;

const keys = [];
const tiles = new Image();
tiles.src = "assets.png";
function drawTile(img, sx,sy,sw,sh,dx,dy,dw,dh){
    ctx.drawImage(img, sx,sy,sw,sh,dx,dy,dw,dh);
}

function animate(){
    drawTile(tiles,200,0,50,50,-31,-25,100,100);
    requestAnimationFrame(animate);
}
animate();

