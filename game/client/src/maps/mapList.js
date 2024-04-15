import { NPC } from "../characters/npc.js";
import { Trainer } from "../characters/trainer.js";
import { clientInstance } from "../main.js";
import { GameMap } from "./map.js";

export class MapList {
    constructor() {
        this.maps = new Map();
        this.npcs = new Map()
        this.trainers = new Map();
        this.addAllMaps();
    }
    
    addMap = (name,data) => {
        this.maps.set(name, data);
    }
    
    getMap =(name) => {
        return this.maps.get(name);
    }

    addNpcs = (name,data) => {
        this.npcs.set(name,data)
    }
    
    getNpcs = (name) => {
        return this.npcs.get(name)
    }

    addTrainer = (name,data) => {
        this.trainers.set(name,data)
    }
    
    getTrainer = (name) => {
        return this.trainers.get(name)
    }

    addAllMaps = () => {
        //ALL THE MAPS THAT WE NEED TO ADD
        //LEFT TWO IS THE COORD WE TELEPORT FROM
        //RIGHT TWO IS THE COORD WE TELEPORT TO ON THE NEXT MAP
        //name is from json map data in resources/tilesetJson
        //14 5 diff x y

       
        //ALl CURRENT MAPS IN GAME
        this.addMap("startingarea", [{next: "startinghouse", coords:[12,16,7,14]}, {next: "cavefit", coords:[28,8,2,7]}])
        this.addMap("startinghouse", [{next:"startingarea", coords:[6,15,12,18]}])
        this.addMap("cavefit", [{next: "startingarea", coords:[1,6,28,9]}, {next: "town2small", coords:[42,3,16,27]}])
        this.addMap("town2small", [{next: "cavefit", coords:[15,27,42,4]}, {next: "ruinsmall", coords:[31,5,7,4]}, {next: "ruinsmall", coords:[32,5,8,4]},
    {next: "generichouse", coords:[8,10,10,11]}, {next:"town2house2", coords:[18,10,10,11]}])
        this.addMap("ruinsmall", [{next:"town2small", coords:[7,3,31,6]}, {next: "town2small", coords:[8,3,32,6]}, {next:"bossroomsmallfit", coords:[39,18,16,18]}])
        this.addMap("bossroomsmallfit",[{next:"ruinsmall", coords:[16,19,39,19]}])

        this.addMap("generichouse", [{next:"town2small", coords:[11,11,8,11]}])
        this.addMap("town2house2", [{next: "town2small", coords:[11,11,18,11]}])

        //ALL CURRENT NPCS IN GAME AND MAP
        // this.addNpcs("startingarea", [{npc: new Trainer("Billy.png",448,528,100,100,{x:448+32, y:528+16})}])
        this.addNpcs("startinghouse", [{npc: new NPC("person096.png", 448,320, "Answer questions to defeat trainers")}])
        this.addNpcs("cavefit", [{npc: new Trainer("Billy.png", 320, 4*32,100,0,{x:50,y:320})}])
        this.addNpcs("cavefit", [{npc: new Trainer("mustache.png", 864, 4*32, 100,0,{x:50,y:320})}])
        this.addNpcs("town2small", [{npc:new Trainer("Billy.png", 864,23*32,120,0,{x:32,y:320})}])
        this.addNpcs("ruinsmall", [{npc: new Trainer("shopkeep.png", 672,736,100,0,{x:32,y:100})}])
        this.addNpcs("bossroomsmallfit", [{npc: new Trainer("person096.png", 448,320,200,0,{x:4,y:32})}])


        // this.addMap("cave", [{next: "startingarea", coords:[5,9,28,10]}, {next: "town2", coords:[29,5,13,51]}])
        // this.addMap("town2", [ {next: "cave", coords:[11,52,29,6]},{next:"ruins", coords:[10,13,42,50]},{next: "generichouse", coords:[44,24,10,11]}])

        // this.addMap("generichouse", [{next: "town2", coords:[8,10,10,11]}])
        // this.addMap("town2house2", [{next: "town2", coords:[11,11,18,11]}])

        // this.addMap("ruins", [{next: "town2", coords:[55,49,11,14]}, {next: "cave2", coords:[56,11,33,64]}, {next: "city3", coords:[11,49,11,51]}] )
        // this.addMap("cave2", {next: "ruins", coords:[1,1,32,66]})
        // this.addMap("city3", [{next: "ruins", coords:[12,12,12,24]}])
        // this.addMap("bossroomsmallfit", [{next: "cave2", coords:[16,19,30,2]}])

        // this.addMap("startingareafit", [ {next: "startinghouse", coords: [10,9,7,14] },{next: "cavefit", coords: [42,8,3,7] }]);
        // this.addMap("startinghouse", [{next: "startingareafit", coords: [5,15,10,12]}]);

        // this.addMap("cavefit", [{next: "startingareafit", coords: [1,7,42,7]}, {next: "town2smallfit", coords:[42,3,4,18]}])
        
        // this.addMap("town2smallfit", [{next: "cavefit", coords: [3,18,42,4]}, {next: "ruinsmallfit", coords: [32,5,8,4]},
        //  {next: "generichouse", coords:[8,10,10,11]}, 
        // {next: "town2house2", coords:[18,10,10,11]}])
        // this.addMap("generichouse", [{next: "town2smallfit", coords:[11,11,8,11]}])
        // this.addMap("town2house2",  [{next: "town2smallfit", coords:[11,11,18,11]}])
        
        // this.addMap("ruinsmallfit", [{next: "town2smallfit", coords:[8,3,32,5]}, {next: "bossroomsmallfit", coords:[30,2,16,18]}])

        // this.addMap("bossroomsmallfit", [{next:"ruinsmallfit", coords:[16,19,30,2]}])
        // // console.log(this.maps, "MAPS")

        // this.addNpcs("startingarea", [{npc: new NPC("Billy.png", 448,528)}])
        
        // this.addNpcs("startinghouse", [{npc: new NPC("Billy", ["woodsword", "woodarmor"], "These will help you become a hero", {x:448-16,y:320}, 150)}])
        // this.addNpcs("generichouse", [{npc: new NPC("Shop", ["small", "big"], "Take these they will help you", {x:320-16,y:7*32}, 90) }])
        // this.addNpcs("town2house2", [{npc:new NPC("96", ["ironarmor", "ironsword"], "If you're adventuring further take these",{x:4*32-16,y:6*32}, 140)}])

        

        
    }
    
}