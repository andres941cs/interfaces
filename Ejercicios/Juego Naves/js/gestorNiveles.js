class Level {
    constructor(number, description,numEnemys,damageMultiplier) {
        this.number = number;
        this.description = description;
        this.numEnemys = numEnemys;
        this.damageMultiplier = damageMultiplier;
    }
}


class LevelManager {
    constructor() {
        this.levels = [];
        this.currentLevelIndex = 0;
    }

     // Agregar un nuevo nivel al gestor
     addLevel(level) {
        this.levels.push(level);
    };

    // Obtener el nivel actual
    getCurrentLevel() {
        return this.levels[this.currentLevelIndex];
    };

    // Avanzar al siguiente nivel
    nextLevel() {
        if (this.currentLevelIndex < this.levels.length - 1) {
            this.currentLevelIndex++;
            return true; // Se avanzó al siguiente nivel
        } else {
            return false; // No hay más niveles disponibles
        }
    };
}

 // Crear instancias de niveles
 const level1 = new Level(1, "Bienvenido al nivel 1",2 ,1);
 const level2 = new Level(2, "¡Felicidades! Has completado el nivel 1. Ahora estás en el nivel 2", 3, 1.5);
 const level3 = new Level(3, "¡Felicidades! Has completado el nivel 2. Ahora estás en el nivel 3", 4, 2);
 const level4 = new Level(4, "¡Felicidades! Has completado el nivel 3. Ahora estás en el nivel 4", 5, 2.5);
 const level5 = new Level(5, "¡Felicidades! Has completado el nivel 4. Ahora estás en el nivel 5", 6, 3);
 // Crear un gestor de niveles
 const levelManager = new LevelManager();

 // Agregar los niveles al gestor
 levelManager.addLevel(level1);
 levelManager.addLevel(level2);
 levelManager.addLevel(level3);
//  levelManager.addLevel(level4);
//  levelManager.addLevel(level5);


