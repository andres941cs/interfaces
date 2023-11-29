
//Lista de imagenes
const imagenes = [
    'img/carta_absol.jpg',
    'img/carta_armarouge.png',
    'img/carta_pikachu.jpg',
    'img/carta_victini.jpg',
    'img/carta_lycanroc.jpg',
    'img/carta_zeraora.jpg',
    'img/carta_absol.jpg',
    'img/carta_armarouge.png',
    'img/carta_pikachu.jpg',
    'img/carta_victini.jpg',
    'img/carta_lycanroc.jpg',
    'img/carta_zeraora.jpg'
];
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos
    }
}
//Generar
//const listaRandom = shuffleArray(imagenes);
shuffleArray(imagenes);
//console.log(imagenes);
function crearCarta(index) {
    const divCarta = document.createElement('div');
    divCarta.classList.add('carta');
    const divCartaAnverso = document.createElement('div');
    divCartaAnverso.classList.add('carta_anverso');
    const divCartaReverso = document.createElement('div');
    divCartaReverso.classList.add('carta_reverso');
    divCartaReverso.classList.add('card_img');
    divCarta.appendChild(divCartaAnverso);
    divCarta.appendChild(divCartaReverso);
    const imageRandom = imagenes[index];
    divCartaAnverso.style.backgroundImage = `url(${imageRandom})`;
    const nombreCarta = imageRandom.split('/').pop().replace(/\.(jpg|png)$/, '');
    divCarta.name = nombreCarta;
    const element = document.querySelector('#card-game');
    element.appendChild(divCarta);
}


for (let index = 0; index < 12; index++) {
    crearCarta(index);
}

function darVuelta(){
    
}
function darLaVuelta(carta){
    if (!carta.classList.contains('girada')) {
        carta.classList.add('girada');
        //OJO. si pongo compararCarta(cartaNueva) se ejecuta directamente, si lo piensas tiene sentido.
        //setTimeout(compararCarta, 500, carta);
    }
}
function comprobarParejas(cartas){
    carta1 = cartas[0].name;
    carta2 = cartas[1].name;
    if( carta1== carta2){
        return true;
    }else{
        return false;
    }
}
let numCardsSelect = 0;
let cardsSelects =[];

const listaCartas = document.getElementsByClassName('carta');
for (const carta of listaCartas) {
    carta.addEventListener('click',()=>{
        numCardsSelect++
        if(numCardsSelect ==1){
            /**/
            darLaVuelta(carta);
            cardsSelects.push(carta);

        }else if(numCardsSelect==2){
            darLaVuelta(carta);
            cardsSelects.push(carta);
            if(comprobarParejas(cardsSelects)){
                /* QUEDARSE SIN VOLVER */
                numCardsSelect=0;
                cardsSelects =[];
            }else{
                /* Dar la vuelta de nuevo las dos */
                setTimeout(()=>{
                    cardsSelects.forEach(element => {
                        element.classList.remove('girada');
                    });
                    numCardsSelect=0;
                    cardsSelects =[];
                }, 1000);
                
            }
        }
    })
}