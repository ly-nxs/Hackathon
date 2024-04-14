import { clientInstance } from "./main.js";

export class EntityManager {
    constructor() {
        this.entities = [];
        this.npcs = []   
        this.trainers = []
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
        
    }

    renderEntities() {
        for (const entity of this.entities) {
            //console.log(entity)
            entity.render();
        }
        
        
        for(const npc of this.npcs) {
            npc.draw();
        }
       
    }

}