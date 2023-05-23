
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

function eleccion(elige){
        let Resultado=""
    if(elige == 1){
        Resultado = "Piedra 🥌🥌";
    } else if(elige == 2)  {
        Resultado = "Papel 🧻";
    } else if(elige == 3) {
        Resultado = "Tijera ✂";
    } else {
        Resultado="NULL"
    }
    return Resultado;
}


//1 es piedra, 2 es papel, 3 es tijera
let jugador=0;
//let min = 1;
//let max = 3;
let pc = 0;
//alert("Elegiste -> " + jugador);

let ganar = 0;
let perder= 0;

while (ganar < 3 && perder < 3){
    pc = aleatorio(1,3);
    jugador = prompt("Elige: 1.Piedra 2.Papel 3.Tijera");
    alert("Pc elige -> "+ eleccion(pc));
    alert("Tu eliges -> "+ eleccion(jugador));

    if(pc == jugador) {
        alert("Empate");
    } else if(jugador==1 && pc==3) {
        alert("GANASTE");
        ganar = ganar + 1;
    } else if (jugador==2 && pc==1){
        alert("Ganaste");
        ganar = ganar + 1;
    }else if(jugador==3 && pc==2) {
        alert("Ganaste");
        ganar = ganar + 1;
    } else {
        alert("Perdiste");
        perder = perder + 1;
    }

};
alert("Ganaste "+ ganar + " veces " + "Perdiste "+ perder + " veces");
//alert("Perdiste "+ perder + " veces");