class Nave {
    constructor(name,model,hp,energy,misiles = 1) {
      this.name = name;
      this.model = model;
      this.hp = hp;
      // this.shield = shield || "";
      this.energy = energy;
      this.misiles = misiles;
      this.posicionNave = { fila: 0, columna: 0 };
    }
    seleccionarAlien(celdaAlien){
      //const celdaAlien = document.getElementById(alienSeleccionado.name);
      limpiarCeldas();
      celdaAlien.classList.add('seleccionado');
    }

    disparar(alienSeleccionado){
      const celdaAlien = document.getElementById(alienSeleccionado.name);
      alienSeleccionado.hp -=1;//Cambiar this.weapon que indicara el dmg que hace la nave
      console.log(alienSeleccionado);
      console.log(alienSeleccionado);
      console.log(celdaAlien);
      if(alienSeleccionado.hp<=0){
        //Desaparece de la tabla
        celdaAlien.classList.remove('shipEnemy');
        limpiarCeldas();
        console.log(celdaAlien);
        //Quitarlo del array
        aliens = aliens.filter(alien => alien.name !== alienSeleccionado.name);
      }
    }

    setShield(boolean){
      this.setShield = boolean;

      if(this.setShield == true)
      {
        const celdaNave = document.querySelector('.ship');
        celdaNave.style.border = '2px solid blue';//Tiene un bug mejor añadir una clase
      }
    }
}