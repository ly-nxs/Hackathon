import { NPC } from "../characters/npc.js";
import { Trainer } from "../characters/trainer.js";
import { clientInstance } from "../main.js";
import { GameMap } from "./map.js";

export class MapList {
    constructor() {
        this.maps = new Map();
        this.npcs = new Map();
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
    
    getNpc = (name) => {
        return this.npcs.get(name)
    }

    getNpcs = () => {
        return this.npcs;
    }

    addTrainer = (name,data) => {
        this.trainers.set(name,data)
    }
    
    getTrainer = (name) => {
        return this.trainers.get(name)
    }

    getTrainers = () => {
        return this.trainers;
    }

    addAllMaps = () => {
        //ALL THE MAPS THAT WE NEED TO ADD
        //LEFT TWO IS THE COORD WE TELEPORT FROM
        //RIGHT TWO IS THE COORD WE TELEPORT TO ON THE NEXT MAP
        //14 5 diff x y

        this.addMap("startingarea", [{next: "startinghouse", coords:[12,16,7,14]}, {next: "cave", coords:[28,8,6,8]}])
        this.addMap("startinghouse", [{next:"startingarea", coords:[6,15,12,18]}])
        this.addMap("cave", [{next: "startingarea", coords:[5,9,28,10]}, {next: "town2", coords:[29,5,13,51]}])
        this.addMap("town2", [ {next: "cave", coords:[11,52,29,6]},{next:"ruins", coords:[10,13,42,50]},{next: "generichouse", coords:[44,24,10,11]}])

        this.addMap("generichouse", [{next: "town2", coords:[8,10,10,11]}])
        this.addMap("town2house2", [{next: "town2", coords:[11,11,18,11]}])

        this.addMap("ruins", [{next: "town2", coords:[55,49,11,14]}, {next: "cave2", coords:[56,11,33,64]}, {next: "city3", coords:[11,49,11,51]}] )
        this.addMap("cave2", {next: "ruins", coords:[1,1,32,66]})
        this.addMap("city3", [{next: "ruins", coords:[12,12,12,24]}])

        this.addMap("startingareafit", [ {next: "startinghouse", coords: [10,9,7,14] },{next: "cavefit", coords: [42,8,3,7] }]);
        this.addMap("startinghouse", [{next: "startingareafit", coords: [5,15,10,12]}]);

        this.addMap("cavefit", [{next: "startingareafit", coords: [1,7,42,7]}, {next: "town2smallfit", coords:[42,3,4,18]}])
        
        this.addMap("town2smallfit", [{next: "cavefit", coords: [3,18,42,4]}, {next: "ruinsmallfit", coords: [32,5,8,4]},
        {next: "generichouse", coords:[8,10,10,11]}, 
        {next: "town2house2", coords:[18,10,10,11]}])
        this.addMap("generichouse", [{next: "town2smallfit", coords:[11,11,8,11]}])
        this.addMap("town2house2",  [{next: "town2smallfit", coords:[11,11,18,11]}])
        
        this.addMap("ruinsmallfit", [{next: "town2smallfit", coords:[8,3,32,5]}, {next: "bossroomsmallfit", coords:[30,2,16,18]}])

        this.addMap("bossroomsmallfit", [{next:"ruinsmallfit", coords:[16,19,30,2]}])
        //console.log(this.maps, "MAPS")

        // add new npcs and trainers here
        this.addTrainer("startingarea", [{trainer: new Trainer("Billy.png",448,528,5,100,"startingarea",{x:448+32, y:528+16})}])
        this.addTrainer("trainer2", [{trainer: new Trainer("Billy.png",748,416,10,100, "cave", {x:748+32, y:416+16})}])
        this.addTrainer("trainer3", [{trainer: new Trainer("Billy.png",600, 1500, 25, 100, "town2", {x:600+32, y:1500+16})}])
        this.addTrainer("trainer4", [{trainer: new Trainer("Billy.png",286, 1712, 50, 100, "ruins", {x:286+32, y:1712+16})}])
        this.addTrainer("trainer5", [{trainer: new Trainer("boss.png",1378, 774, 250, 100, "cave2", {x:1378+32, y:774+16})}])
        this.addTrainer("trainer6", [{trainer: new Trainer("boss.png",600, 600, 250, 100, "city3", {x:600+32, y:600+16})}])


    }   
}