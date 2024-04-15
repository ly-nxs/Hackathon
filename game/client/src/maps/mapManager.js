import { clientInstance } from "../main.js";
import { Player } from "../player.js";
import { GameMap } from "./map.js";

export let player;

export class MapManager2 {
  constructor() {
    this.currentMap = new GameMap("startingarea", null, null);
    this.currentNpcs = null;
    this.switching=false;
    this.duration = 500; // duration in milliseconds
    this.startValue = 0;
    this.endValue = 1;
    this.startTime=Date.now();
    this.animationValue=0;
  }

    initMap = async (map)  => {
    // this.currentMap = await init(map);
    // console.log(this.currentMap, "CURRENT MAP")
    // console.log("Player created")
    // clientInstance.player = new Player();
    // console.log(clientInstance.player.xVel, clientInstance.player.yVel, "XVEL CLIENT INSTANCE THE PLAYER HERE RIGHT HEREH LLEO")

    // console.log(this.currentMap)
    // console.log(path, "PATH");
  }

  loadNewMap = async (name,xLoad,yLoad) => {

    clientInstance.entityManager.arrows = []
    clientInstance.entityManager.npcs = []
    clientInstance.entityManager.enemies = []
    clientInstance.entityManager.projectiles = []

    const coords = clientInstance.mapList.getMap(name).coords;

    const npcs = clientInstance.mapList.getNpcs()
    const trainers = clientInstance.mapList.getTrainers()
    
    this.currentMap = await new GameMap(name, coords, npcs);
    await this.currentMap.initTileMap(name);
    if(!clientInstance.player) clientInstance.player = new Player();
    player = clientInstance.player;
    clientInstance.player.character.updatePosition(xLoad*32 || 19*32, yLoad*32 || 17*32);
    console.log(npcs)
    if(npcs) {
      for (const [npcName, npc] of npcs.entries()) {
        clientInstance.entityManager.addNPC(npc)
      }
    }
    if(trainers){
      for (const [trainerName, trainer] of trainers.entries()) {
        clientInstance.entityManager.addTrainer(trainer)
      }
    }
    
  }

  loadNewMap2 = async () => {
    this.currentMap = clientInstance.mapList.getMap("startinghouse")
    //await this.currentMap.initTileMap("startinghouse");
    //clientInstance.player = await new Player();

  }

  switchMapsWithAnimation = () => {
    this.startTime = Date.now();
    this.switching = true;
 }
 
 getAnimationValue = () => {
   const currentTime = Date.now() - this.startTime;
   const progress = currentTime / this.duration;
   const easedProgress = this.easeInOutSine(progress);
   const currentValue = this.startValue + (this.endValue - this.startValue) * easedProgress;
   return currentValue;
 }
 
 easeInOutSine = (x) => {
   return -(Math.cos(Math.PI * x) - 1) / 2;
 }

  drawScreen = async () => {
    if(this.currentMap && this.currentMap.mapData){
    this.currentMap.drawMap();
    //this.currentMap.drawSky();
    }
    // if (this.currentMap && clientInstance.tileMap) {
      // drawMap(
      //   this.currentMap.mapData,
      //   this.currentMap.mapWidth,
      //   this.currentMap.mapHeight,
      //   clientInstance.canvas.ctx,
      //   clientInstance.tileMap.tileCanvas,
      //   this.currentMap.tileSize,
      // );
    // }
    // if(this.switching){
    //    this.animationValue = this.getAnimationValue();
    //   console.log(this.animationValue)
    //   if(this.animationValue >= 1){
    //     this.switching = false;
    //     clientInstance.mapManager.initMap(Util.getMapDataLocation("startinghouse.json"))
    //     //init(Util.getMapDataLocation("startingarea.json"))
    //     clientInstance.tileMap = await createMap(Util.getMapDataLocation("startinghouse.json"));
    //     this.animationValue=0;
    //   }
    // }
    // clientInstance.canvas.ctx.fillStyle = `rgba(0, 0, 0, ${this.animationValue})`;
    // clientInstance.canvas.ctx.rect(0, 0, clientInstance.canvas.canvas.width, clientInstance.canvas.canvas.height);
    // clientInstance.canvas.ctx.fill();

  }

  drawSky = () => {
    if(this.currentMap && this.currentMap.mapData)
    this.currentMap.drawSky();
  }



}