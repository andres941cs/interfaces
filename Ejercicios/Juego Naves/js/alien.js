class Alien {
    constructor(name,type,hp,alienMoveInterval,dmg) {
      this.name = name;
      this.type = type;
      this.hp = hp;
      this.alienMoveInterval= alienMoveInterval ||'';
      //this.moves = moves;
      this.dmg = dmg || 1;
      this.positionColumna = '';
      this.positionFila = '';
      this.intervalID = '';
    }
    //alienMoveInterval = 3000;
    //alienAttackInterval = 5000;
    crearAlien() {
      const grid = document.getElementById('grid');
      const cells = grid.getElementsByClassName('cell');
  
      let randomX, randomY;
      do {
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 6);
          this.positionColumna = randomX;
          this.positionFila = randomY;
      } while (cells[randomY * 10 + randomX].classList.contains('ship') ||
                cells[randomY * 10 + randomX].classList.contains('gaate') ||
                cells[randomY * 10 + randomX].classList.contains('shipEnemy'));
      cells[randomY * 10 + randomX].classList.add('shipEnemy');
      cells[randomY * 10 + randomX].id=this.name;
  }

ataqueAlien(){
  damageMeter.value -=this.dmg;
  damageNumber.textContent = damageMeter.value;
}

moveAlien(name) {
  
  // Coordenadas de la nave (puedes ajustar esto según sea necesario)
  //let posicionNave = { fila: 0, columna: 0 };
  let posicionNave = { fila: nave.posicionNave.fila, columna: nave.posicionNave.columna };
  // Coordenadas actuales del alien
  let posicionAlien = { fila:this.positionFila , columna:this.positionColumna};

  // Elemento de la celda del alien
  const celdaAlien = document.querySelector('#' + name);
    //console.log(posicionAlien);
    
  // Calcula las diferencias entre la posición del alien y la posición de la nave
  const difFila = posicionNave.fila - posicionAlien.fila;
  const difColumna = posicionNave.columna - posicionAlien.columna;
    //console.log('Fila ' + difFila + ' Columna ' + difColumna);

  // Verifica si el alien está a una casilla de la nave
  if (Math.abs(difFila) <= 1 && Math.abs(difColumna) <= 1) {
      console.log('El alien ya está cerca de la nave. No se mueve más.');
      this.ataqueAlien();
        //console.log('INTENTO ATAQUE');
      return;  // No realiza más movimientos
  }

  // Mueve al alien un paso hacia la nave
  const nuevaFila = posicionAlien.fila + Math.sign(difFila);
  const nuevaColumna = posicionAlien.columna + Math.sign(difColumna);
    //console.log('Fila ' + nuevaFila + ' Columna ' + nuevaColumna);
  // Actualiza la posición del alien
  const alienSeleccionado = document.querySelector('.seleccionado');
  // if (alienSeleccionado) {
  //   //nave.seleccionarAlien(celdaAlien);
  //   celdaAlien.classList.remove('seleccionado');
  // }
  celdaAlien.classList.remove('shipEnemy');
  celdaAlien.id = null;

  const columnas = 10;

  // Mueve al alien a la nueva posición solo si no ha alcanzado la posición de la nave
  if (nuevaFila !== posicionNave.fila || nuevaColumna !== posicionNave.columna) {

    console.log(celdaAlien.classList.contains('seleccionado'));
    console.log(celdaAlien)
    
      // Mueve al alien a la nueva posición
      const nuevaPosicion = nuevaFila * columnas + nuevaColumna + 1;
      document.querySelector(`.cell:nth-child(${nuevaPosicion})`).classList.add('shipEnemy');
      document.querySelector(`.cell:nth-child(${nuevaPosicion})`).id = this.name;
      if (celdaAlien.classList.contains('seleccionado')) {
        celdaAlien.classList.remove('seleccionado');
        document.querySelector(`.cell:nth-child(${nuevaPosicion})`).classList.add('seleccionado');
      }
      
      // Actualiza las coordenadas del alien
      this.positionFila = nuevaFila;
      this.positionColumna = nuevaColumna;

        //console.log(`Nueva posición: Fila ${nuevaFila}, Columna ${nuevaColumna}`);
  } else {
      console.log('El alien ya está en la posición de la nave.');
      ataqueAlien();
      console.log('INTENTO ATAQUE');
  }

  console.log('Intento de moverse realizado');
  
}



  attackInterval() {
    setInterval(function () {
        // Lógica para que los aliens ataquen cada cierto intervalo de tiempo
        // Aquí puedes agregar lógica específica para el ataque de los aliens
        console.log('¡Los aliens están atacando!');
        handleAlienAttack();
    }, alienAttackInterval);
}

moveInterva(){
  //setInterval(this.moveAlien(this.name), this.alienMoveInterval);
  this.intervalID =  setInterval(() => {
      console.log(this.hp);console.log(this.intervalID);
      if(this.hp==0){ 
        this.clearMoveInterval();
        console.log('Se intenta borrar pero no va');
      }
      this.moveAlien(this.name);
    }, this.alienMoveInterval);
  
  
}
clearMoveInterval() {
  // Verifica si hay un intervalo en ejecución antes de intentar detenerlo
  if (this.intervalID !== null) {
    clearInterval(this.intervalID);
    this.intervalID = null; // Marca el intervalo como detenido
  }
}
}