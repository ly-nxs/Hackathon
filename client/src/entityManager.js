import { clientInstance } from "./main.js";

export class EntityManager {
    constructor() {
        this.entities = [];
        this.arrows = []
        this.meleeAttacks = []
        this.enemies = []
        this.npcs = []
        this.maps = []
        this.projectiles = []

    }

    addProjectile(projectile) {
        this.projectiles.push(projectile)
    }

    addNPC(npc) {
        this.npcs.push(npc);
    }

    addEnemy(enemy) {
        this.enemies.push(enemy)
    }

    addArrow(arrow) {
        this.arrows.push(arrow);
    }

    addMeleeAttack(attack) {
        this.meleeAttacks.push(attack)
    }
    

    addEntity(entity) {
        this.entities.push(entity);
    }

    updateEntities() {
        for (const entity of this.entities) {
            entity.update();
        }

        for(const arrow of this.arrows) {
                const collision = clientInstance.mapManager.currentMap.collision.data;
                let index=-1;
                collision.forEach(element => {
                    index++;
                    if(element == 0) return;
                    //if()
                    const location = this.indexToXY(index);
                    if(arrow.x > location.x*32 && arrow.x < location.x*32+32 && arrow.y > location.y*32 && arrow.y < location.y*32+32) {
                        arrow.xVel=0;
                        arrow.yVel=0;
                    }
                });
            arrow.update();
        }
        for(const attack of this.meleeAttacks) {
            attack.update();
        }

        for(const enemy of this.enemies) {
            enemy.update();
        }
        for(const npc of this.npcs){
            npc.update();
        }
        for(const projectile of this.projectiles) {
            projectile.update();
        }
    }

    renderEntities() {
        for (const entity of this.entities) {
            //console.log(entity)
            entity.render();
        }
        for(const arrow of this.arrows) {
            arrow.render();
        }
        for(const attack of this.meleeAttacks) {
            attack.render();
        }
        for(const enemy of this.enemies) {
            enemy.draw();
        }
        for(const npc of this.npcs) {
            npc.draw();
        }
        for(const projectile of this.projectiles) {
            projectile.draw();
        }
    }

    clearMeleeAttacks() {
        this.meleeAttacks = [];
    }

    indexToXY = (index) => {
        const tileMapWidth = clientInstance.mapManager.currentMap.mapWidth;
        const x = index % tileMapWidth;
        const y = Math.floor(index / tileMapWidth);

        return { x, y };
    };
}