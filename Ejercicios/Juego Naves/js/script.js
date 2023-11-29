/* DECLARACIONES */
const timer = document.getElementById('input-timer');
const shipButton = document.getElementById('shipButton');
let aliens = [];
const nave = new Nave("Jugador1","simple",90,90);
let alienSeleccionado = '';

let crewMembers = [];
/* Funcionamiento Timer */
timer.readOnly = true;
const timeRandom = Math.floor(Math.random() * (180 - 120) + 120);
const minutos = Math.floor(timeRandom/60).toString().padStart(2, '0');
const segundos = (timeRandom % 60).toString().padStart(2, '0');
timer.value = `${minutos}:${segundos}`;

function timeIntervalFunction(){
    let timeChange = timer.value;
    const [minutosChange, segundosChange] = timeChange.split(':').map(Number);
    let time = (minutosChange*60+segundosChange)-1;
    checkTimer(time)
    const minutos = Math.floor(time/60).toString().padStart(2, '0');
    const segundos = (time % 60).toString().padStart(2, '0');
    timer.value = `${minutos}:${segundos}`;
    checkGame();
    if(gameScreen.style.display == "block"){checkStatusBattle();}
    stateMeters();
    overheatingEngine()
}
let timeInterval = setInterval(timeIntervalFunction, 1000);
function checkTimer(seconds){
    var secondsElapsed = timeRandom - seconds;
    if (secondsElapsed > 0) {
        if (secondsElapsed % 30 === 0) {
            timer.classList.add('timerRed')
        } else if (seconds <= 10) {
            timer.classList.add('timerRed')
        } else {
            timer.classList.remove('timerRed')
        }
    }
}
/* Estado Indicadores */
function stateMeters() {
    let indicadores = [survivorNumber,energyNumber,damageNumber]

    for (const indicador of indicadores) {
        let value = indicador.textContent;
        if (value >= 50 && value <= 100) {
            indicador.style.color = 'green';
          } else if (value >= 25 && value < 50) {
            indicador.style.color = 'yellow';
          } else if (value >= 0 && value < 25) {
            indicador.style.color = 'red';
          }
    }
}

function overheatingEngine() {
    let value = overheatingMeter.value--;
    overHeatingNumber.textContent =value;   
    
    if (value >= 50 && value <= 100) {
        overHeatingNumber.style.color = 'red';
    } else if (value >= 25 && value < 50) {
        overHeatingNumber.style.color = 'yellow';
    } else if (value >= 0 && value < 25) {
        overHeatingNumber.style.color = 'green';
    }
}

/* Datos */
const medidores = document.getElementById('meters');

const survivor = document.getElementById('survivor');// DIV SUPERVIVIENTES
const survivorMeter = document.getElementById('survivor-meter');// INPUT SUPERVIVIENTES
const survivorNumber = document.createElement('span');
survivorNumber.textContent = survivorMeter.value;
survivor.appendChild(survivorNumber);
survivorNumber.style.display = 'none';
toogleDisplay(survivorMeter,survivorNumber);

const energy = document.getElementById('energy');// DIV SUPERVIVIENTES
const energyMeter = document.getElementById('energy-meter');// INPUT SUPERVIVIENTES
const energyNumber = document.createElement('span');
energyNumber.textContent = energyMeter.value;
energyNumber.style.display = 'none';
energy.appendChild(energyNumber);
toogleDisplay(energyMeter,energyNumber);

function toogleDisplay(input,span){
    input.addEventListener('click', function () {
        // Muestra el elemento p y oculta el input
        span.style.display = 'inline';
        input.style.display = 'none';
    });
    span.addEventListener('click', function () {
        // Muestra el input y oculta el elemento p
        input.style.display = 'inline';
        span.style.display = 'none';
    });
}

const damage = document.getElementById('damage');// DIV SUPERVIVIENTES
const damageMeter = document.getElementById('damage-meter');// INPUT SUPERVIVIENTES
const damageNumber = document.createElement('span');//MODIFICAR EL ESTILO
damageNumber.textContent = damageMeter.value;
damageNumber.style.display = 'none';
damage.appendChild(damageNumber);
toogleDisplay(damageMeter,damageNumber);

const overHeating = document.getElementById('progress');// DIV PROGRESS
const overheatingMeter = document.getElementById('jump-progress');// INPUT JUMP
const overHeatingNumber = document.createElement('span');
overHeatingNumber.textContent = overheatingMeter.value;
overHeatingNumber.style.display = 'none';
overHeating.appendChild(overHeatingNumber);
overheatingMeter.addEventListener('click', function () {
    // Muestra el elemento p y oculta el input
    overHeatingNumber.style.display = 'inline';
    overheatingMeter.style.display = 'none';
});
overHeatingNumber.addEventListener('click', function () {
    // Muestra el input y oculta el elemento p
    overheatingMeter.style.display = 'inline-block';
    overHeatingNumber.style.display = 'none';
});

const inputWeapon1 = document.getElementById('weapon1');
inputWeapon1.checked = true;
const inputWeapon2 = document.getElementById('weapon2');

const ammunition = document.getElementById('ammunition');//DIV MUNICION
const ammunitionMeter = document.getElementById('ammunition-meter');//INPUT MUNICION
ammunitionMeter.value = nave.misiles;
const ammunitionNumber = document.createElement('span');
ammunitionNumber.textContent = "∞";
ammunition.appendChild(ammunitionNumber);

const buttonShoot = document.getElementById('button-shoot');

const engineCooling = document.getElementById('engine-cooling'); //DIV COOLING
const engineCoolingRange = document.getElementById('coolingRange');//INPUT COOLING
engineCoolingRange.value = 0;
const engineCoolingNumber = document.getElementById('engine-cooling-number');
engineCoolingNumber.textContent = 0;

function incrementValue() {
    if (parseFloat(engineCoolingRange.value) < parseFloat(engineCoolingRange.max)){
        engineCoolingRange.value =parseInt(engineCoolingRange.value)+ 1;
        let value = engineCoolingRange.value;
        console.log(value)
        engineCoolingNumber.innerText = value;
        clearInterval(intervalCooling);
        if(engineCoolingRange.value>0 ){
            intervalCooling = setInterval(function() {
                energyMeter.value-=value;
                energyNumber.textContent = energyMeter.value;
                //Enfriamiento del motor
                overheatingMeter.value-=value;
                overHeatingNumber.textContent =overheatingMeter.value;  
            }, 1000);
            
        }else{
            clearInterval(intervalSpeed); 
        }
    }
}

function decrementValue() {
if (parseFloat(engineCoolingRange.value) > parseFloat(engineCoolingRange.min)) {
    engineCoolingRange.value =parseInt(engineCoolingRange.value)- 1;
    let value = engineCoolingRange.value;
    console.log(value)
    engineCoolingNumber.innerText = value;
    clearInterval(intervalCooling);
    if(engineCoolingRange.value>0 ){
        intervalCooling = setInterval(function() {
            energyMeter.value-=value;
            energyNumber.textContent = energyMeter.value;
            //Enfriamiento del motor
            overheatingMeter.value-=value;
            overHeatingNumber.textContent =overheatingMeter.value;  
        }, 1000);
        
    }else{
        clearInterval(intervalSpeed); 
    }
}
}

// Botones Interfaz
const rotateLeft = document.getElementById('leftButton');
const rotateRigth = document.getElementById('rightButton');

function toogleShow(button,element){
    button.addEventListener('click',()=>{
        if (element.style.display == "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });
}
toogleShow(shipButton,medidores);

const engineButton = document.getElementById('engineButton');
const engineDiv = document.getElementById('engineDiv');
toogleShow(engineButton,engineDiv);

const alienButton = document.getElementById('alienButton');
const alienDiv = document.getElementById('alien-interface');
alienButton.addEventListener('click',()=>{
    if (alienDiv.style.display == "block") {
        alienDiv.style.display = "none";
    } else {
        showAlienInterfaz();
        alienDiv.style.display = "block";
    }
});

const levelButton = document.getElementById('levelButton');
const levelDiv = document.getElementById('level-interface');
levelButton.addEventListener('click',()=>{
    if (levelDiv.style.display == "block") {
        levelDiv.style.display = "none";
    } else {
        showLevelInterfaz();
        levelDiv.style.display = "block";
    }
});
/* ALMACENAR VALORES */
let setSessionData = (name,value)=>{
    // Almacenar datos en sessionStorage
    sessionStorage.setItem(name, value);
}
//Tambien se puede usar localStorage
let getSessionData = (name)=>{
    // Recuperar datos de sessionStorage
    let valor = sessionStorage.getItem(name);
    return valor;
}
function saveData() {
    setSessionData('data-survivor',survivorNumber.textContent);
    setSessionData('data-energy',energyNumber.textContent);
    setSessionData('data-damage',damageNumber.textContent);
    setSessionData('data-ammo',ammunitionMeter.value);
    setSessionData('data-crew',crewMembers);
}
function loadData() {
    const survivorSave = getSessionData('data-survivor');
    const energySave = getSessionData('data-energy');
    const damageSave = getSessionData('data-damage');
    const ammoSave = getSessionData('data-ammo');
    const crewSave = getSessionData('data-crew');

    survivorNumber.textContent = survivorSave;
    energyNumber.textContent = energySave;
    damageNumber.textContent = damageSave;
    //ammunitionNumber.textContent = ammoSave;
    crewMembers = crewSave;
    // CARGAR INPUTS
    survivorMeter.value = survivorSave;
    energyMeter.value = energySave;
    damageMeter.value = damageSave;
    ammunitionMeter.value = ammoSave;
}
window.addEventListener("beforeunload", function (event) {
    /* DATOS GUARDADOS */
    saveData();
  });

  if (sessionStorage.length) {
    /* DATOS CARGADOS */
    loadData();
  }else{
    /* DATOS DEFAULT */
    survivorNumber.textContent = 90;
    energyNumber.textContent = nave.energy;
    damageNumber.textContent = nave.hp;

    survivorMeter.value = 90;
    energyMeter.value = nave.energy;
    damageMeter.value = nave.hp;
  }

/* INTERFAZ ESCUDOS */
const onShieldButton = document.getElementById('on-shield');
const offShieldButton = document.getElementById('off-shield');


/* INTERFAZ PROPULSOR */
let intervalSpeed;
function changeSpeed(speed){
    speedSlider.value = parseInt(speedSlider.value) + parseInt(speed);
    clearInterval(intervalSpeed)
    if(speedSlider.value>1 ){
        intervalSpeed = setInterval(function() {
            energyMeter.value-=speedSlider.value/100;
            energyNumber.textContent = energyMeter.value;
          }, 1000);
          
    }else{
        clearInterval(intervalSpeed); 
    }
}

let currentRotation = 0;
rotateLeft.addEventListener('click',()=>{
    currentRotation -= 90;
    const ship = document.querySelector('.ship');
    console.log(ship)
    ship.style.transform = `rotate(${currentRotation}deg)`;
});
rotateRigth.addEventListener('click',()=>{
    currentRotation += 90;
    ship.style.transform = `rotate(${currentRotation}deg)`;
});

/* INTERFAZ ARMAS */
function changeWeapon() {
    const armaSeleccionada = document.getElementById('weaponSelect');
    //const municionSeleccionada = document.getElementById('ammoSelect');
    if (inputWeapon2.checked) {
        inputWeapon1.checked = true;
        armaSeleccionada.textContent = "Láseres";
        ammunitionNumber.textContent = "∞";
      } else {
        inputWeapon2.checked = true;
        armaSeleccionada.textContent = "Misiles Nucleares";
        ammunitionNumber.textContent = ammunitionMeter.value;
      }


}
let bulletsWasted=0;
function shootWeapon() {
    const limitBullets = 5;
    if (inputWeapon1.checked) {
        if(bulletsWasted<limitBullets){
            energyMeter.value--;
            energyNumber.textContent = energyMeter.value;
            bulletsWasted++;
            if(alienSeleccionado){
                const alien = aliens.find(alien => alien.name === alienSeleccionado.id);
                nave.disparar(alien);}

            if(bulletsWasted==5)buttonShoot.disabled = true;
        }
      };

    if(inputWeapon2.checked) {
        ammunitionNumber.textContent--;
        ammunitionMeter.value = ammunitionNumber.textContent;
        //TERMINAR
      }
}
function reloadWeapon(){
    bulletsWasted=0;
    buttonShoot.disabled = false;
}
/* INTERFAZ MOTOR DE SALTO */
let intervalCooling;
engineCoolingRange.addEventListener("input", (e) => {
    let value = engineCoolingRange.value;
    engineCoolingNumber.textContent = value;
    clearInterval(intervalCooling);
    if(engineCoolingRange.value>0 ){
        intervalCooling = setInterval(function() {
            energyMeter.value-=value;
            console.log(energyMeter.value);
            energyNumber.textContent = energyMeter.value;
            //Enfriamiento del motor
            overheatingMeter.value-=value;
            overHeatingNumber.textContent =overheatingMeter.value;  
          }, 1000);
          
    }else{
        clearInterval(intervalSpeed); 
    }
});
/* INTERFAZ TRIPULANTES */
// function addCrew() {
//     const name = document.getElementById('crew-member-name').value;
//     const role = document.getElementById('crew-member-function').value;
//     const lvl = document.getElementById('crew-member-skill').value;
//     const status = document.getElementById('crew-member-status').value;
//     const birthdate = document.getElementById('crew-member-birthdate').value;

//     const crewMember = {
//         name: name,
//         role: role,
//         lvl: lvl,
//         status: status,
//         birthdate: birthdate
//       };
//     crewMembers.push(crewMember);
// }
/* MODALES */
function deleteModal(){
    document.querySelector('.modal').remove();
}
function createModal(tituloString,descriptionString,canClose=true,arrayButtons){
    //Oscurecer el fondo
    const modal = document.createElement('div');
    modal.classList.add("modal");
    modal.style.display = "block";
    //El div del modal
    const modalContent = document.createElement('div');
    modalContent.classList.add("modal-contenido");
    const titulo = document.createElement('div');
    titulo.classList.add("head-data");
    titulo.style.borderBottom = "1px solid #6a94a9";
    titulo.style.opacity = 1;
    titulo.textContent = tituloString;
    if (canClose) {
        const cerrarModal = document.createElement('span');
        cerrarModal.innerHTML = '&times;';
        cerrarModal.classList.add("cerrar-modal");
        cerrarModal.onclick = deleteModal;
        titulo.appendChild(cerrarModal);
    }
    const description = document.createElement('div');
    description.classList.add('body-data');
    description.innerHTML = descriptionString;
    modal.appendChild(modalContent);
    modalContent.appendChild(titulo);
    modalContent.appendChild(description);
    
    if (arrayButtons && arrayButtons.length > 0) {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add("button-panel");
        buttonsContainer.style.justifyContent= "center"
        arrayButtons.forEach(button => {
            buttonsContainer.appendChild(button);
        });


        modalContent.appendChild(buttonsContainer);
    }

    document.body.appendChild(modal);
}


/* FASE RECONOCIMIENTO */

/* FASE EXPLORACION */

/* FASE COMBATE */
let shipPosition = { x: 0, y: 0 };
//shipPosition = nave.posicionNave;
// Función para crear la cuadrícula
function createGrid(rows, cols) {
    const grid = document.getElementById('grid');
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', function () {
                //moveShipToPosition(col, row);
                checkCell(col, row)
            });
            grid.appendChild(cell);
        }
    }
}
//FUNCION PARA MOVER LA NAVE CON TECLADO
function moveShip(event) {
    const grid = document.getElementById('grid');
    const cells = grid.getElementsByClassName('cell');

    // Elimina la clase 'ship' de la celda actual
    cells[shipPosition.y * 10 + shipPosition.x].classList.remove('ship');

    // Mueve la nave según la tecla presionada
    switch (event.key) {
        case 'ArrowUp':
            if (shipPosition.y > 0) shipPosition.y--;
            break;
        case 'ArrowDown':
            if (shipPosition.y < 5) shipPosition.y++;
            break;
        case 'ArrowLeft':
            if (shipPosition.x > 0) shipPosition.x--;
            break;
        case 'ArrowRight':
            if (shipPosition.x < 9) shipPosition.x++;
            break;
    }

    // Añade la clase 'ship' a la nueva celda
    nave.posicionNave.columna = shipPosition.x;
    nave.posicionNave.fila= shipPosition.y ;
    cells[shipPosition.y * 10 + shipPosition.x].classList.add('ship');
}
//FUNCION PARA CREAR VARIOS ALIENS A LA VEZ
function placeAliens(numAliens) {
    const grid = document.getElementById('grid');
    const cells = grid.getElementsByClassName('cell');

    for (let i = 0; i < numAliens; i++) {
        let randomX, randomY;
        do {
            randomX = Math.floor(Math.random() * 10);
            randomY = Math.floor(Math.random() * 6);
        } while (cells[randomY * 10 + randomX].classList.contains('ship') ||
                 cells[randomY * 10 + randomX].classList.contains('gate') ||
                 cells[randomY * 10 + randomX].classList.contains('shipEnemy'));

        cells[randomY * 10 + randomX].classList.add('shipEnemy');
    }
}
//FUNCION PARA MOVER LA NAVE CON CLICK
function moveShipToPosition(x, y) {
    const grid = document.getElementById('grid');
    const cells = grid.getElementsByClassName('cell');

    // Elimina la clase 'ship' de la celda actual
    cells[shipPosition.y * 10 + shipPosition.x].classList.remove('ship');

    // Actualiza las coordenadas de la nave
    shipPosition.x = x;
    shipPosition.y = y;

    nave.posicionNave.columna = x;
    nave.posicionNave.fila= y;

    // Añade la clase 'ship' a la nueva celda
    cells[shipPosition.y * 10 + shipPosition.x].classList.add('ship');
}
//FUNCION PARA VERIFICAR SI LA CELDA CONTIENE ALGUN ELEMENTO
function checkCell(x, y) {
    const grid = document.getElementById('grid');
    const cells = grid.getElementsByClassName('cell');

    const clickedCell = cells[y * 10 + x];

    // Verifica si la celda contiene un portal
    if (clickedCell.classList.contains('gate')) {
        console.log('¡Hiciste clic en un portal!');
        //COMPLETAR
    }

    // Verifica si la celda contiene un alien
    if (clickedCell.classList.contains('shipEnemy')) {
        console.log('¡Hiciste clic en un alien!');

                // Calcula la distancia entre la nave y el alien
                const distance = calculateDistance(x, y, shipPosition.x, shipPosition.y);

                // Define la distancia límite para mostrar el mensaje (ajusta según tus necesidades)
                const proximityThreshold = 1;//Umbral De Proximidad

                // Verifica si estás lo suficientemente cerca del alien para mostrar el mensaje
                if (distance <= proximityThreshold) {
                    alert('Estás cerca de un alien. ¡Cuidado!');
                    // Puedes agregar la lógica adicional que desees para manejar la proximidad al alien
                    alienSeleccionado = clickedCell;
                    nave.seleccionarAlien(clickedCell);
                    return;//Impedir que se dirija al alien
                } else {
                    console.log('Demasiado lejos para interactuar con el alien.');
                    return;//Impedir que se dirija al alien lejano
                    // Puedes agregar la lógica adicional que desees para manejar el clic en un alien lejano
                }
    }

    // Mueve la nave a la posición clicada
    moveShipToPosition(x, y);
}
//CALCULAR EL UMBRAL DE DISTANCIA
function calculateDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
//MODIFICARLO ANADE LOS EVENTOS DE TECLADO
document.addEventListener('keydown', moveShip);


const onButtonShield = document.getElementById('onShieldButton');
onButtonShield.addEventListener('click',()=>{
    nave.setShield(true);
})
const offButtonShield = document.getElementById('offShieldButton');
offButtonShield.addEventListener('click',()=>{
    nave.setShield(true);
})
/* FASE GANAR O PERDER */
function checkGame(){
    let timeChange = timer.value;
    const [minutosChange, segundosChange] = timeChange.split(':').map(Number);
    let time = (minutosChange*60+segundosChange)-1;
    if(energyNumber.textContent==0||damageNumber.textContent==0||time==0){
        createModal("Game Over","Has perdido");
    }
}

/* FUNCIONES NUEVAS */
stateMeters();

function emergencyJump(){
    survivorMeter.value -=30;
    survivorNumber.textContent = survivorMeter.value;

    energyMeter.value -=30;
    energyNumber.textContent = energyMeter.value;
  
    damageMeter.value -=30;
    damageNumber.textContent = damageMeter.value;

    if (levelManager.nextLevel()) {
        newLevel();
    } else {
        createModal('Mensaje del Sistema',"¡Felicidades! Has completado todos los niveles disponibles.",false);
    }
}
/* FUNCIONES DEFAULT */
function mostrarDivInterface(interface) {
    const element = document.getElementById(interface);
    if (element.style.display == "block") {
        element.style.display = "none";
        document.getElementById("interfaces").style.display = "none";
    } else {
        ocultarFormularios();
        document.getElementById("interfaces").style.display = "block";
        element.style.display = "block";
    }

}

function mostrarArmaInterface() {
    ocultarTodasLasInterfaces();
    
    document.getElementById("interfaces").style.display = "block";
    document.getElementById("arma-interface").style.display = "block";
}

function ocultarFormularios(){
    document.getElementById("interfaces").style.display = "none";
    document.getElementById("shield-interface").style.display = "none";
    document.getElementById("propulsor-interface").style.display = "none";
    document.getElementById("arma-interface").style.display = "none";
    // document.getElementById("tripulacion-interface").style.display = "none";
    document.getElementById("motor-salto-interface").style.display = "none";
}
function ocultarTodasLasInterfaces() {
    ocultarFormularios();
    medidores.style.display = "none";
    alienDiv.style.display = "none";
    levelDiv.style.display = "none";
    engineDiv.style.display = "none";
}

// AJUSTES DE INTERFAZ
const interfaz = document.getElementById('main-container');
const explorationScreen = document.getElementById('game-exploration');
const gameScreen = document.getElementById('game-container');
function cambiarInterfazBatalla(imgGate){
    /* Cambiar Interfaz Batalla */
   // const imgGate = document.querySelector(".imgGate");
    agregarYEliminarClase(imgGate,'miAnimacion');
    interfaz.class = 'animated zoomOut';
    // Esperar a que termine la animación en el primer elemento
    interfaz.addEventListener('animationend', function() {
        agregarYEliminarClase(interfaz,'puff-in-center');
        interfaz.style.backgroundImage = "url('../img/fondoCombate.png')";
        explorationScreen.style.display = "none";
        gameScreen.style.display = "block";
    }, { once: true });

    /* Crear Interfaz Batalla */
    createGrid(6, 10);
    const cells = document.getElementById('grid').getElementsByClassName('cell');//Mover a las constantes
    cells[shipPosition.y * 10 + shipPosition.x].classList.add('ship');
    Portal.generarPortalesPlanetarios(imgGate);
    startBattle();
}
function insertarAlienInterfaz(alien){
    const alienDataDiv = document.createElement('div');
    alienDataDiv.classList.add('body-data');
    const alienName = document.createElement('div');
    alienName.textContent = "Nombre: "+ alien.name;
    const div = document.createElement('div');
    const span = document.createElement('div');
    span.style.display = 'inline-block';
    span.textContent = "HP: "
    const alienHP = document.createElement('meter');
    alienHP.max = levelManager.maxHP;
    alienHP.value = alien.hp;
    
    div.appendChild(span);
    div.appendChild(alienHP);
    alienDataDiv.appendChild(alienName);
    // alienDataDiv.appendChild(alienType);
    alienDataDiv.appendChild(div);
    alienDiv.appendChild(alienDataDiv);
}

function showAlienInterfaz(){
    alienDiv.innerHTML='';
    const divHeadData = document.createElement('div');
    divHeadData.className = 'classHead';
    var spanAlien = document.createElement('span');
    spanAlien.className = 'material-symbols-outlined';
    spanAlien.textContent = 'coronavirus';
    var spanAlienText = document.createElement('span');
    spanAlienText.textContent = 'Aliens';
    divHeadData.appendChild(spanAlien);
    divHeadData.appendChild(spanAlienText);
    alienDiv.appendChild(divHeadData);
    if (aliens.length > 0) {
        aliens.forEach(alien => {
            insertarAlienInterfaz(alien);
        });
    }else{
        const divBodyData = document.createElement('div');
        divBodyData.className = 'body-data';
        const p = document.createElement('p');
        p.textContent = "No hay alienigenas disponibles";
        divBodyData.appendChild(p);
        alienDiv.appendChild(divBodyData);
    }

}
function showLevelInterfaz(){
    levelDiv.innerHTML='';
    const divHeadData = document.createElement('div');
    divHeadData.className = 'classHead';
    const spanIcon = document.createElement('span');
    spanIcon.className = 'material-symbols-outlined';
    spanIcon.textContent = 'stacks';
    const spanText = document.createElement('span');
    spanText.textContent = 'LVLs';
    divHeadData.appendChild(spanIcon);
    divHeadData.appendChild(spanText);
    levelDiv.appendChild(divHeadData);

    const divBodyData = document.createElement('div');
    divBodyData.className = 'body-data';
    const p = document.createElement('p');
    p.textContent = "Nivel Actual: "+levelManager.getCurrentLevel().number;

    const numEnemys = document.createElement('p');
    numEnemys.textContent = "Num Enemigos: "+levelManager.getCurrentLevel().numEnemys;

    const dmgMulti = document.createElement('p');
    dmgMulti.textContent = "Multiplicador dmg: "+levelManager.getCurrentLevel().damageMultiplier;

    divBodyData.appendChild(p);
    divBodyData.appendChild(numEnemys);
    divBodyData.appendChild(dmgMulti);
    levelDiv.appendChild(divBodyData);
    
}

function startBattle(){

    const currentLevel = levelManager.getCurrentLevel();
    console.log(currentLevel);
    console.log(currentLevel.damageMultiplier);
    let newDamage = Math.ceil(1*currentLevel.damageMultiplier);
    for (let index = 0; index < currentLevel.numEnemys; index++) {
        const alien = new Alien('Alien'+index,'lordakia',5,4000,newDamage);
        alien.crearAlien();
        alien.moveInterva();
        aliens.push(alien);
        levelManager.maxHP = alien.hp;
        //insertarAlienInterfaz(alien);
    }
}
function checkStatusBattle(){
    //Actualizar los datos de los aliens
    showAlienInterfaz();
    //Si se eliminan los enemigos se activaran los portales
    if(aliens.length == 0){
    Portal.activarPortales();
    }

}

/* ANIMACIONES */
function agregarAnimacion(elemento,animacion){
    document.body.classList.add('scroll-desactivado');
    elemento.classList.add(animacion);
  
    elemento.addEventListener('animationend', function() {
        document.body.classList.add('scroll-desactivado');
    }, { once: true });
}
function agregarYEliminarClase(elemento,clase) {
    // Eliminar el scroll durante la animacion
    document.body.classList.add('scroll-desactivado');
    // Agregar la clase con la animacion
    elemento.classList.add(clase);
  
    elemento.addEventListener('animationend', function() {
        elemento.classList.remove(clase);
        document.body.classList.add('scroll-desactivado');
    }, { once: true });
  }

const interfaces = document.getElementById("interfaces");
agregarAnimacion(interfaces,'tilt-in-fwd-tr');
//agregarYEliminarClase(interfaces,'tilt-in-fwd-tr');
//interfaces.classList.add('tilt-in-fwd-tr');
//   agregarYEliminarClase(imgGate,'animated');
//   agregarYEliminarClase(imgGate,'zoomOut');

function animacionInterfaz()
{
    const imgGate = document.querySelector(".imgGate");
    agregarYEliminarClase(imgGate,'miAnimacion');
    //document.getElementById('main-container').classList.add('cambioInterfaz');
    document.getElementById('main-container').classList.add('animated');
    document.getElementById('main-container').classList.add('zoomOut');
    document.getElementById('main-container').addEventListener('animationend', function() {
      console.log('Transición en elemento1 terminada');
    }, { once: true });
}

//Se va al combate
function limpiarCeldas() {
    // Quitar la clase 'seleccionado' de todas las celdas
    const celdasSeleccionadas = document.querySelectorAll('.seleccionado');
    celdasSeleccionadas.forEach(celda => {
      celda.classList.remove('seleccionado');
    });
  }


  function jumpNextStage(){
    // IR AL SIGUIENTE LEVEL
    if(overheatingMeter.value<25 && aliens.length == 0){
        if (levelManager.nextLevel()) {
            newLevel();
            
            console.log(levelManager.getCurrentLevel().description);

        } else {
            createModal('Mensaje del Sistema',"¡Felicidades! Has completado todos los niveles disponibles.",false);
        }
    }
  }

// FUNCIONES RANDOM
const portalesRandom =  Portal.seleccionarPortalesAleatorios(portalesInterestelares);
portalesRandom.forEach(portal => {
   const img = portal.generarPortal();
   const randomFunction = Math.random() < 0.5 ?  () => batallaRandom(img) : () => recompensaRandom(img);
    img.onclick = randomFunction;
});

function batallaRandom(imgGate){
    const buttonYes = document.createElement('button');
    buttonYes.textContent="Si";
    const buttonCancel =document.createElement('button');
    buttonCancel.textContent="Cancel";
    buttonYes.onclick = ()=>{
        const modal = document.querySelector('.modal');
        console.log(modal);
        modal.parentNode.removeChild(modal);
        ocultarTodasLasInterfaces();
        cambiarInterfazBatalla(imgGate);
    }
    buttonCancel.onclick =deleteModal;
    createModal("Aviso","Seguro que quieres viajar al sistema seleccionado?",true,[buttonYes,buttonCancel]);
}

function recompensaRandom(imgGate){
    //CREACION DEL MODAL
    const buttonYes = document.createElement('button');
    buttonYes.textContent="Si";
    const buttonCancel =document.createElement('button');
    buttonCancel.textContent="Cancel";
    buttonYes.onclick = ()=>{
        const modal = document.querySelector('.modal');
        console.log(modal);
        modal.parentNode.removeChild(modal);
        //OBTENER RECOPESNSAS
        let cofreRandom = new Cofre("",5,10,1);
        cofreRandom.abrirCofre();
        createModal("Recompensas",`
        Has conseguido ${cofreRandom.energias} energia<br>
        Has conseguido ${cofreRandom.cascoNave} casco de nave<br>
        Has conseguido ${cofreRandom.misiles} misiles`);
        //DESABILITAR EL PORTAL
        console.log(imgGate)
        imgGate.classList.add('imgDisable');
        imgGate.onclick = "";
    }
    buttonCancel.onclick =deleteModal;
    createModal("Aviso","Seguro que quieres viajar al sistema seleccionado?",true,[buttonYes,buttonCancel]);
    
}

function newLevel(){
    aliens=[];
    ocultarTodasLasInterfaces();
    interfaz.classList.add('animated');
    interfaz.classList.add('zoomOut');
    clearInterval(timeInterval);
    const newTimeRandom = Math.floor(Math.random() * (180 - 120) + 120);
    const newMinutos = Math.floor(newTimeRandom/60).toString().padStart(2, '0');
    const newSegundos = (newTimeRandom % 60).toString().padStart(2, '0');
    timer.value = `${newMinutos}:${newSegundos}`;
    timeInterval = setInterval(timeIntervalFunction, 1000);
    overheatingMeter.value =100;
    // Esperar a que termine la animación en el primer elemento
    interfaz.addEventListener('animationend', function() {
      // Realizar cambios en el segundo elemento después de que termine la animación en el primero
        interfaz.classList.remove('animated');
        interfaz.classList.remove('zoomOut');
         agregarYEliminarClase(interfaz,'puff-in-center');
        interfaz.style.backgroundImage = "url('../img/fondoStar.jpg')";
        gameScreen.style.display = "none";
        const grid = document.getElementById('grid');
        grid.innerHTML="";
        explorationScreen.style.display = "grid";
        createModal('Mensaje del Sistema',levelManager.getCurrentLevel().description);
    }, { once: true });
}

function spanHideForms(){
  const  spans = document.querySelectorAll('div.classHead > span.material-symbols-outlined')
  for (const span of spans) {
    console.log(span);
    span.addEventListener('click',()=>{
        const id = span.textContent+"-inteface";
        ocultarFormularios();
    })
  }
}
spanHideForms();
