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

        for(const npc of this.npcs){
            npc.update();
        }
        
        for (const trainer of this.trainers) {
            if (trainer) trainer[0].trainer.update();
            else console.log("trainer is null")
        }
    }

    renderEntities() {
        for (const entity of this.entities) {
            //console.log(entity)
            entity.render();
        }
        
        
        for (const npc of this.npcs) {
            npc.draw();
        }

        for (const trainer of this.trainers) {
            if (trainer) trainer[0].trainer.draw();
            else console.log("trainer is null")
        }       
    }
}