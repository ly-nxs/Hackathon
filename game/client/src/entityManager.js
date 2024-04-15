import { clientInstance } from "./main.js";

export class EntityManager {
    constructor() {
        this.entities = [];
        this.npcs = []   
        this.trainers = []
    }

    addTrainer(trainer) {
        this.trainers.push(trainer)
    }
 
    addNPC(npc) {
        this.npcs.push(npc);
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    updateEntities() {
        for (const entity of this.entities) {
            entity.update();
        }

        for (const npc of this.npcs) {
            if (npc) npc[0].npc.update();
            else console.log("npc is null")
        }
        
        for (const trainer of this.trainers) {
            if (trainer) trainer[0].trainer.update();
            else console.log("trainer is null")
        }
    }

    renderEntities() {
        const world = clientInstance.mapManager.currentMap.name;
        for (const entity of this.entities) {
            //console.log(entity)
            entity.render();
        }
        
        
        for (const npc of this.npcs) {
            if (npc[0].npc.level == world) npc[0].npc.draw();
        }  

        for (const trainer of this.trainers) {
            if (trainer[0].trainer.level == world) trainer[0].trainer.draw();
        }       
    }
}