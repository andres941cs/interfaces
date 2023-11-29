class Cofre {
  
    constructor(id, maxEnergias = 0, maxCascoNave = 0,maxMisiles = 0) {
        this.id = id;
        this.energias = maxEnergias > 0 ? Math.floor(Math.random() * maxEnergias) + 1 : 0;
        this.cascoNave = maxCascoNave > 0 ? Math.floor(Math.random() * maxCascoNave) + 1 : 0;
        this.misiles = maxMisiles > 0 ? Math.floor(Math.random() * maxMisiles) + 1 : 0;
    }
    // Métodos
    obtenerItems() {
      return this.items;
    }
    abrirCofre(){
        nave.energy+=this.energias;
        nave.hp+=this.cascoNave;
        nave.misiliesp+=this.misiles;

        energyMeter.value += this.energias;
        energyNumber.textContent = energyMeter.value;

        damageMeter.value +=this.cascoNave;
        damageNumber.textContent = damageMeter.value;

        ammunitionMeter.value += this.misiles;
        damageNumber.textContent = nave.hp;
    }

  }