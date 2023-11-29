class Portal {
    constructor(name,img,type) {
      this.name = name;
      this.img = img;
      this.type = type;
    }

    
    generarPortal(){
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const imgGate = document.createElement('img');
        imgGate.src = this.img;
        imgGate.classList.add('imgGate');
        imgGate.id = this.name;
        const gameExploration = document.getElementById('game-exploration');
        imageContainer.appendChild(imgGate);
        gameExploration.appendChild(imageContainer);
        return imgGate;
    }

    //Generar los cuartos portales
  static generarPortalesPlanetarios(imgPortal){
    // Falta el multiplicar de niveles.
    const cells = document.getElementById('grid').getElementsByClassName('cell');
    const portalPlanetario = portales.find(portal => portal.name === imgPortal.id);
    portalPositions.forEach((position) => {
        const index = position.y * 10 + position.x;
        cells[index].classList.add('gate');
        console.log(cells[index])
        cells[index].style.backgroundImage = "url("+portalPlanetario.img+")";
    });
  }
  static activarPortales(){
    const cells = document.getElementById('grid').getElementsByClassName('cell');
    portalPositions.forEach((position) => {
        const index = position.y * 10 + position.x;
        cells[index].classList.add('active');
        //cells[index].style.backgrounImage = 'img/gate/ganmaClick.png';
        cells[index].addEventListener("dblclick", function() {
          // Generar nuevo mapa
          Portal.generarPlaneta();
      });
    });
  }
  static generarPlaneta(){
    const grid = document.getElementById('grid');
    const cells = grid.getElementsByClassName('cell');
    console.log(levelManager.getCurrentLevel());
    //Limpiar tablero
    generarChests(5);
    placeAliens(5);
  }

  static seleccionarPortalesAleatorios(array) {
    const elementosAleatorios = [];
    const copiaArray = array.slice(); // Creamos una copia del array original

    for (let i = 0; i < 4; i++) {
        const indiceAleatorio = Math.floor(Math.random() * copiaArray.length);
        const portalSeleccionado = copiaArray.splice(indiceAleatorio, 1)[0];
        elementosAleatorios.push(portalSeleccionado);
    }

    return elementosAleatorios;
}
}
const portalesInterestelares = [
    new Portal("Alfa",'img/PortalesInterestelares/gate-alfa.gif',"interestelar"),
    new Portal("Beta",'img/PortalesInterestelares/gate-beta.gif',"interestelar"),
    new Portal("Gamma",'img/PortalesInterestelares/gate-gamma.gif',"interestelar"),
    new Portal("Zeta",'img/PortalesInterestelares/gate-zeta.gif',"interestelar"),
    new Portal("Hades",'img/PortalesInterestelares/gate-hades.gif',"interestelar"),
    new Portal("Kronos",'img/PortalesInterestelares/gate-kronos.gif',"interestelar"),
    new Portal("Kappa",'img/PortalesInterestelares/gate-kappa.gif',"interestelar")
];

const portales = [
    new Portal("Zeta",'img/portales/zeta.png',"planetarios"),
    new Portal("Alfa",'img/portales/alfa.png',"planetarios"),
    new Portal("Beta",'img/portales/beta.png',"planetarios"),
    new Portal("Gamma",'img/portales/gamma.png',"planetarios"),
    new Portal("Hades",'img/portales/hades.png',"planetarios"),
    new Portal("Kronos",'img/portales/kronos.png',"planetarios"),
    new Portal("Kappa",'img/portales/kappa.png',"planetarios")
];

const portalPositions = [
    { x: 0, y: 0 },
    { x: 0, y: 5 },
    { x: 9, y: 0 },
    { x: 9, y: 5 }
];
function generarChests(numChests){
  const grid = document.getElementById('grid');
  const cells = grid.getElementsByClassName('cell');

  for (let i = 0; i < numChests; i++) {
      let randomX, randomY;
      do {
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 6);
      } while (cells[randomY * 10 + randomX].classList.contains('ship') ||
               cells[randomY * 10 + randomX].classList.contains('gate') ||
               cells[randomY * 10 + randomX].classList.contains('shipEnemy'));

      cells[randomY * 10 + randomX].classList.add('chest');
  }
}

function iniciarPortales(){
  portalesInterestelares
}