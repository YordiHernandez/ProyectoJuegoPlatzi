//alert("si entra a js mokepon");
/*variables de getdocumentbyID*/

const botonMascota = document.getElementById('btn_mascota');//Obtiene del html un objeto por Id
const botonReiniciar = document.getElementById("btn_reiniciar"); //asigna boton reiniciar a la variable 


const spanmascota = document.getElementById('text_mascota');

const seccionMascota = document.getElementById("seleccionar_mascota");

const spanmascotaE = document.getElementById('text_mascotaE');

const Lugarparrafo = document.getElementById("Resultado"); //obtiene el parrafo
const ataqueJu = document.getElementById("ataqueJ"); //obtiene el parrafo
const ataqueEn = document.getElementById("ataqueE"); //obtiene el parrafo

const lugarmensaje = document.getElementById("Resultado"); //obtiene el parrafo
const Tarjetas = document.getElementById("Tarjetas");
const TarjetaAtaques = document.getElementById("Ataques");
const ContenedorImagenE = document.getElementById("AE");
const ContenedorImagenJ = document.getElementById("AJ");
let imagenE;
let imagenJ;

const vp = document.getElementById("vidaJugador");
const ve = document.getElementById("vidaEnemigo");

const seccionataque = document.getElementById("seleccionar_ataque");

let mokeponesEnemigos = [];
let ataqueJugador=[]; //declaracion de variables globales
let ataqueEnemigo=[];
let lifePlayer = 3;
let lifeEnemy = 3;
let mokepones = []; //Declaracion de arreglos
let opcionMokepon;
let opcionAtaque;
let mascotaJ;

let botonFuego; //declara variables pa guardr los botones
let botonAgua;
let botonTierra;
let botones =[];

/*let inputhipoge = document.getElementById('hipoge'); //obtiene elementos por id en este caso los checkbox
let inputcapipepo = document.getElementById('capipepo');
let inputrati = document.getElementById('ratigueya');*/

let inputhipoge;
let inputcapipepo;
let inputrati; 
let inputvalstrax;
let inputnergigante;

let labelhipoge;
let labelcapipepo;
let labelrati;
let labelvalstrax;
let labelnergigante;


let ataquesMokeponEnemigo;
let indexAtaqueEnemigo;
let indexAtaqueJugador;
let victoriasJugador = 0;
let victoriasEnemigo= 0;
let jugadorId = null;
let enemigoId = null;

//variables para canvas
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa'); //obtiene el canvas por id
let lienzo = mapa.getContext("2d"); //le asigno mapa a lienzo para dbijar en el canvas
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/Ruta_29_HGSS.png'
let mascotaJugadorObjeto; //variable global que guardara el objeto del for para que agarre la que se ha selccionado en vez de una en concreto
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth -20; //innerWidth consigue el ancho de la pantalla
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
};

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
    constructor(nombre,foto, vida, id = null) { //al momento de llamar si no se le asigna valor, utilizara los por defecto
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 50;
        this.alto = 50; //no se define como parametro ya que no sera ingresado de esa manera
        this.x = aleatorio(mapa.width - this.ancho , 0 ); //tomara estos valores ya que se declaran despues de los defecto, osea los toma despues de defecto entonces si asigna estos
        this.y = aleatorio(mapa.height - this.alto, 0);
        this.mapaFoto = new Image();
        this.mapaFoto.src = foto;
        this.velocidadX = 0;
        this.velocidadY = 0;
    } 

    pintarMokepon(){ //se crea un metodo para la clase, un metodo es un cuando una propiedad es una funcion, y esta se asocia a la clase
        lienzo.drawImage( //dibuja una imagen en la variable lienzo que es donde se guarda el canvas
        this.mapaFoto, //imagen
        this.x + 150, //desde donde empieza en x
        this.y + 100, // desde donde empieza en y, siempre desde la esquina superior izquierda se cuenta
        this.ancho,
        this.alto
    );   
    };

}

let lagiacrus = new Mokepon ('Lagiacrus', './assets/75d29aaa55fc85f4749ce7666d18280f-removebg-preview.png', 5 );

let glavenus = new Mokepon ('Glavenus', './assets/glavenusBK.png' , 5);

let barroth = new Mokepon ('Barroth', './assets/barroth-removebg.png', 5);

let valstrax = new Mokepon ('Valstrax', './assets/valstrax-removebg-preview.png', 5);

let Nergigante = new Mokepon ('Nergigante', './assets/nergigante.png',5);

/*let lagiacrusEnemigo = new Mokepon ('Lagiacrus', './assets/75d29aaa55fc85f4749ce7666d18280f-removebg-preview.png', 5);

let glavenusEnemigo = new Mokepon ('Glavenus', './assets/glavenusBK.png' , 5);

let barrothEnemigo = new Mokepon ('Barroth', './assets/barroth-removebg.png', 5);

let valstraxEnemigo = new Mokepon ('Valstrax', './assets/valstrax-removebg-preview.png', 5);

let NergiganteEnemigo = new Mokepon ('Nergigante', './assets/nergigante.png',5);*/

//mokepones.push(lagiacrus,glavenus,barroth); /*empuja o inyecta este valor en este arreglo*/
//console.log(mokepones);

const lagiacrusAtaques = [{nombre: '💧' , id: 'btn_agua'},
{nombre: '💧' , id: 'btn_agua'},
{nombre: '💧' , id: 'btn_agua'},
{nombre: '🔥' , id: 'btn_fuego'},
{nombre: '🌱' , id: 'btn_tierra'}];

const glavenusAtaques = [
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🌱' , id: 'btn_tierra'}
];

const barrothAtaques = [
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🔥' , id: 'btn_fuego'} 
];

lagiacrus.ataques.push( //se hace push a los ataques de la clase con tal objeto
    ...lagiacrusAtaques //... significa que es como si hubiera escrito lo de variable dentro de aqui, no como "lista"
);//agrega datos a ataques de lagiacrus

glavenus.ataques.push(
    ...glavenusAtaques
);//agrega datos a ataques de glavenus

barroth.ataques.push(
     ...barrothAtaques
);//agrega datos a ataques de barroth

valstrax.ataques.push(
    ...barrothAtaques
);

Nergigante.ataques.push(
    ...glavenusAtaques
);

/*lagiacrusEnemigo.ataques.push( //se hace push a los ataques de la clase con tal objeto
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '🌱' , id: 'btn_tierra'}
);//agrega datos a ataques de lagiacrus

glavenusEnemigo.ataques.push(
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '🔥' , id: 'btn_fuego'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🌱' , id: 'btn_tierra'}
);//agrega datos a ataques de glavenus

barrothEnemigo.ataques.push(
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🔥' , id: 'btn_fuego'}  
);//agrega datos a ataques de barroth

valstraxEnemigo.ataques.push(
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🔥' , id: 'btn_fuego'}  
);

NergiganteEnemigo.ataques.push(
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '🌱' , id: 'btn_tierra'},
    {nombre: '💧' , id: 'btn_agua'},
    {nombre: '🔥' , id: 'btn_fuego'}  
)*/

mokepones.push(lagiacrus,glavenus,barroth, valstrax, Nergigante);

function aleatorio(max,min){ //funcion para generar numeros aleatorios
 return Math.floor(Math.random() * (max - min + 1) + min)
};

function selectmascota (){ //funcion que selecciona mascota e imprime que se selecciono
    
    if (inputhipoge.checked) { //verifica que el Elemento este chekeado
        spanmascota.innerHTML=inputhipoge.id; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById, innerHTML es para cambiar dinamicamente contenido en html, 
        //Tambien obtiene el valor id del input vinculado al inputhipogeid establecido en el html
        imagenJ = labelhipoge.lastElementChild;
        ContenedorImagenJ.appendChild(imagenJ);
        mascotaJ = inputhipoge.id;
        Swal.fire('ELEGISTE A: '+mascotaJ)
    } else if (inputcapipepo.checked){
        spanmascota.innerHTML=inputcapipepo.id; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        imagenJ = labelcapipepo.lastElementChild; //le asigno el valor lastelement del label
        ContenedorImagenJ.appendChild(imagenJ); // le pongo de hijo a la imagen
        mascotaJ = inputcapipepo.id;
        alert("ELEGISTE a " +mascotaJ);
    } else if (inputrati.checked) {
        spanmascota.innerHTML=inputrati.id; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        imagenJ = labelrati.lastElementChild; //le asigno el valor lastelement del label
        ContenedorImagenJ.appendChild(imagenJ);
        mascotaJ = inputrati.id;
        alert("ELEGISTE a "+mascotaJ);
    } else if (inputvalstrax.checked){
        spanmascota.innerHTML = inputvalstrax.id;
        imagenJ = labelvalstrax.lastElementChild; //le asigno el valor lastelement del label
        ContenedorImagenJ.appendChild(imagenJ);
        mascotaJ=inputvalstrax.id;
        alert('ELEGISTE a '+mascotaJ);
    } else if(inputnergigante.checked) {
        spanmascota.innerHTML = inputnergigante.id
        imagenJ = labelnergigante.lastElementChild; //le asigno el valor lastelement del label
        ContenedorImagenJ.appendChild(imagenJ);
        mascotaJ = inputnergigante.id;
        alert("Elegiste a "+mascotaJ);
    } else {
        alert("Selecciona una mascota para continuar");
        return; //return vacio, para la funcion
    }

    seleccionarMokepon(mascotaJ);

    extraerAtaques(mascotaJ);
    seccionMascota.style.display='none'; //oculta la seccion asignada en la variable es decir pone un display none
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
};

function seleccionarMokepon(mascotaJ){
    fetch(`http://192.168.1.102:5500/mokepon/${jugadorId}`,{
        method: "post", //metodo de la api
        headers: { //especifica los encabezados http , los cuales proporcionan informacion adicional sobre la solicitud
            "content-type" : "application/json"
        },
        body: JSON.stringify({ //especifica los datos que se enviaran en el cuperp de la solicitudy si lo transofrmara
            mokepon: mascotaJ
        })
    })
    
};

function extraerAtaques(mascotaJ){ //funcion para definir ataque de los pokemon xd
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJ === mokepones[i].nombre){ //Compara tipo y caracteres/numeros lo q tenga dentro XDDD
            ataques = mokepones[i].ataques; //mete en la variable y se vuelve un array ya que la propiedad ataques tambien lo es
        }
    }
    mostrarAtaquesBtn(ataques);
};

function mostrarAtaquesBtn(ataques){
    ataques.forEach((ataques) => {
        opcionAtaque = `
        <button id=${ataques.id} class="btn_ataque BAtaque">${ataques.nombre}</button> 
        `//se puede asignar mas de una clase a un objeto
        TarjetaAtaques.innerHTML += opcionAtaque;
    });

    botonFuego = document.getElementById("btn_fuego"); //como ya existen los botones ahora si asignamos el id
    //declara botones iguales a bton de id en html
    botonAgua = document.getElementById("btn_agua");
    botonTierra = document.getElementById("btn_tierra");
    botones = document.querySelectorAll('.BAtaque'); //segunda clase BAtaque
    //console.log(botones);

    //ya que existen los botones se le agrega los eventos
    /*botonFuego.addEventListener('click', ataqueFuego); //verifica si le da click y llama a la funcion ataaqueFuego
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);*/

    secuenciaAtaque();
};

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => { //e es el evento en si mismo, en este caso devolvera EL EVENTO click
            console.log(e);
            if (e.target.textContent==="🔥"){ //ya que el evento tiene target y textcontent se usa aqui para trabajar con ellos
                ataqueJugador.push('FUEGO') //se pushea al array el valor del boton como texto
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled= true;
            } else if(e.target.textContent==="💧") {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled= true;
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled= true;
            }
            //selectAtaqueE();
            if(ataqueJugador.length === 5){
                enviarAtaques();
            }
        });
    });
};


function enviarAtaques(){
    fetch(`http://192.168.1.102:5500/mokepon/${jugadorId}/ataques`, {
       method: "post",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify({
        ataques: ataqueJugador
       })
    })

    intervalo = setInterval(obtnerAtaques, 50);
};

function obtnerAtaques() {
    fetch(`http://192.168.1.102:5500/mokepon/${enemigoId}/ataques`)
       .then(function(res){
           if (res.ok) {
               res.json()
               .then(function ( {ataques} ){
                   if(ataques.length === 5){
                       ataqueEnemigo = ataques;
                       combate();
                   }
               })
           }
       })
};


function selectmascotaE (enemigo){ //funcion que genera mascota aleatoria para pc
    //let mascotaE = aleatorio(mokepones.length-1,0); //Funcion de numero aleatorio, que como valor maximo toma el tamaño que es 5 -1 para maximo un 4 y empieza desde 0 para poder tomar todos los valores en el array

    //alert(`PC ELIGE A ${mokepones[mascotaE].nombre}`) //Muesta mokepones.nombre segun la posicion del array generado por mascotaE de arriba
    /*spanmascotaE.innerHTML = mokepones[mascotaE].nombre; //imprime el valor mokepones en el indice generado por aleatorio y su valor de nombre
    ataquesMokeponEnemigo = mokepones[mascotaE].ataques; //Obtiene los ataques del arreglo
    imagenE = mokepones[mascotaE].foto; //le asigno objeto imagen de la clase mokepon segun el array con el numero aleatorio generado
    let crearImagenE = document.createElement('img') //creo una imagen 
    crearImagenE.setAttribute('src', imagenE); //le pongo el atributo src a mi nuevo img creado
    ContenedorImagenE.appendChild(crearImagenE); //le pongo de child la imagen */

    spanmascotaE.innerHTML = enemigo.nombre; //imprime el valor mokepones en el indice generado por aleatorio y su valor de nombre
    ataquesMokeponEnemigo = enemigo.ataques; //Obtiene los ataques del arreglo
    imagenE = enemigo.foto; //le asigno objeto imagen de la clase mokepon segun el array con el numero aleatorio generado
    let crearImagenE = document.createElement('img') //creo una imagen 
    crearImagenE.setAttribute('src', imagenE); //le pongo el atributo src a mi nuevo img creado
    ContenedorImagenE.appendChild(crearImagenE);

    /*if(mascotaE == 1){
        spanmascotaE.innerHTML="Lagiacrus"; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        alert("PC elige a Lagiacrus");
    } else if (mascotaE==2) {
        spanmascotaE.innerHTML="Glavenus"; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        alert("PC elige a Glavenus");
    } else if (mascotaE==3){
        spanmascotaE.innerHTML="Barroth"; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        alert("PC elige a Barroth");

    } else {
        alert("Error fatalxd")
    }*/
    

    //lienzo.fillRect(5,15,20,40); //(x,y,ancho,alto) 
};

function crearParrafo(res){ //funcion que crea un parrafo en html

    //let resP = document.createElement('p'); //le asigna a parrafo que cree un 'p' de parrafo en html
    let ataqueJup = document.createElement('p'); //le asigna a parrafo que cree un 'p' de parrafo en html
    let ataqueEnp = document.createElement('p'); //le asigna a parrafo que cree un 'p' de parrafo en html

    Lugarparrafo.innerHTML = res;
    ataqueJup.innerHTML = indexAtaqueJugador;
    ataqueEnp.innerHTML = indexAtaqueEnemigo;
    
    //parrafo.innerHTML="Tu mascota ataco con: " + ataqueJugador + " y la mascota enemiga ataco con: " + ataqueEnemigo + " **Resultado** " + res;  //le da el texto a la variable "parrafo"
    //Lugarparrafo.appendChild(resP); //inserto en la seccion que deseo el parrafo
    ataqueJu.appendChild(ataqueJup);//insert un hijo a ataqueJu por lo que ira poniendo un parrafo debajo de otro
    ataqueEn.appendChild(ataqueEnp);
};

function vidas(){
    
    if(victoriasEnemigo===victoriasJugador){
        //let parrafo = document.createElement('p'); //le asigna a parrafo que cree un 'p' de parrafo en html
        lugarmensaje.innerHTML="<H2>EMPATE</H2>";
        //lugarmensaje.appendChild(parrafo); //inserto en la seccion que deseo el parrafo
        botonReiniciar.style.display='block';
    } else if (victoriasJugador>victoriasEnemigo) {
        //let parrafo = document.createElement('p'); //le asigna a parrafo que cree un 'p' de parrafo en html
        lugarmensaje.innerHTML="<H2>GANASTE</H2>";
        //lugarmensaje.appendChild(parrafo); //inserto en la seccion que deseo el parrafo
        botonFuego.disabled= true;
        botonAgua.disabled= true;
        botonTierra.disabled= true;
        botonReiniciar.style.display='block';
    } else  {
        lugarmensaje.innerHTML="<H2>Perdiste</H2>";
        botonFuego.disabled= true;
        botonAgua.disabled= true;
        botonTierra.disabled= true;
        botonReiniciar.style.display='block';
    };

};

function iniciarPelea(){
    if (ataqueJugador.length===5){
        combate();
    }
};

function indexAmbosOponentes(player, enemy){
    indexAtaqueJugador = ataqueJugador[player];
    indexAtaqueEnemigo = ataqueEnemigo[enemy];
}

function combate(){ // funcion para ver si gana, empata o pierde

    clearInterval(intervalo);
    let resultado = "";

    for (let index = 0; index < ataqueJugador.length; index++) {


        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            resultado = "Nadaxd";
            crearParrafo(resultado);
        } else if ((ataqueJugador[index]==="AGUA" && ataqueEnemigo[index]==="FUEGO") || (ataqueJugador[index]==="FUEGO" && ataqueEnemigo[index]==="TIERRA") || (ataqueJugador[index]==="TIERRA" && ataqueEnemigo[index]==="AGUA")) {
            indexAmbosOponentes(index,index)
            resultado = "Vamos Maquina joderxd";
            //lifeEnemy--
            victoriasJugador++
            vp.innerHTML=victoriasJugador;  
            crearParrafo(resultado);
        } else {
            indexAmbosOponentes(index,index)
            resultado = "ValioBurguer"
            //lifePlayer--
            victoriasEnemigo++;
            ve.innerHTML=victoriasEnemigo;
            crearParrafo(resultado);
        }
    }
    vidas();
    
    //verificar vidas
    
};

/*function selectAtaqueE (){ // al igual que el anterior, obtiene ataque aleatorio
    
    let ataqueE = aleatorio(ataquesMokeponEnemigo.length - 1, 0);
    //let spanAtaque = document.getElementById('TataqueE'); //variable control del Span ataque enemigo

    if(ataqueE === 0 || ataqueE===1 || ataqueE === 2 ){
        //spanAtaque.innerHTML="Fuego"; // Cambia el spanmascota que esta vinculado a Tataque gracias al getElementById
        //ataqueEnemigo='Fuego';
        ataqueEnemigo.push('FUEGO');
    } else if (ataqueE===3 || ataqueE===4) {
        //spanAtaque.innerHTML="Agua"; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        //ataqueEnemigo='Agua';
        ataqueEnemigo.push('AGUA')
    } else /*(ataqueE==2){
        //spanAtaque.innerHTML="Tierra"; // Cambia el spanmascota que esta vinculado a text_mascota gracias al getElementById
        //ataqueEnemigo='Tierra';
        ataqueEnemigo.push('TIERRA');
    }; /*else {
        alert("Error fatalxd")
    };  
    console.log(ataqueEnemigo);
    iniciarPelea();
    //combate();
};*/

function initgame (){ //Funcion que empieza el juego, en donde se declaran los botones y los eventos de click, para cuando cargue le pagina. y crea el area de mokepones
    seccionataque.style.display='none'; //oculta la seccion de ataque
    sectionVerMapa.style.display ='none'


    mokepones.forEach(Mokepon =>{ //forEach sirve para declarar que por cada objeto en el arreglo, hacer la funcion flecha declarada
        opcionMokepon = ` 
        <input type="radio" name="mascota" id=${Mokepon.nombre} /> <!--dejar un espacio entre el cierre de etiqueta y la declaracion del id si no genera problemas de lectura-->
                <label class="tarjetaPok" for=${Mokepon.nombre} id="label-${Mokepon.nombre}">
                    <p>${Mokepon.nombre}</p>
                    <img src=${Mokepon.foto} alt=${Mokepon.nombre}/>
                </label>
        ` 
        Tarjetas.innerHTML += opcionMokepon; //Sirve para generar en tarjetas el + sirve para seguir generando sin remplazar uno ya existente

        inputhipoge = document.getElementById('Lagiacrus'); //obtiene elementos por id en este caso los checkbox
        inputcapipepo = document.getElementById('Glavenus');
        inputrati = document.getElementById('Barroth');
        inputvalstrax = document.getElementById('Valstrax');
        inputnergigante = document.getElementById('Nergigante');

        labelhipoge = document.getElementById('label-Lagiacrus'); //obtiene elementos por id en este caso los checkbox
        labelcapipepo = document.getElementById('label-Glavenus');
        labelrati = document.getElementById('label-Barroth');
        labelvalstrax = document.getElementById('label-Valstrax');
        labelnergigante = document.getElementById('label-Nergigante');

    });

    botonMascota.addEventListener('click', selectmascota);  //Añade evento, en este caso la funcion selectmascota, al hacer click (click es el evento y  selecmacosta la funncion de ese evento)
    botonReiniciar.addEventListener('click',reiniciarJuego); //asigna la funcion a reiniciar (evento, funcion)
    botonReiniciar.style.display='none';

    unirseAlJuego();

};

function unirseAlJuego(){
    fetch("http://192.168.1.102:5500/unirse") //Peticion fetch, GET, llamada a servicios
    .then(function(res){
        console.log(res);
        if (res.ok) {
            res.text()
            .then(function(respuesta){
                console.log(respuesta);
                jugadorId = respuesta;
            })
        }
    })
};

/*function ataqueFuego(){//Asigna Fuego a ataqueJugador al hacer click y llama la funcion de ataque enemigo
    //let spanAtaque = document.getElementById('Tataque');
    ataqueJugador="Fuego";
    alert("Tu ataque es: " + ataqueJugador)
    //spanAtaque.innerHTML="Fuego"
    selectAtaqueE();
};

function ataqueAgua(){
    //let spanAtaque = document.getElementById('Tataque');
    ataqueJugador="Agua";
    alert("Tu ataque es: " + ataqueJugador)
    //spanAtaque.innerHTML="Agua"
    selectAtaqueE();
};

function ataqueTierra(){
    //let spanAtaque = document.getElementById('Tataque');
    ataqueJugador="Tierra";
    alert("Tu ataque es: " + ataqueJugador)
    //spanAtaque.innerHTML="Tierra"
    selectAtaqueE();
};*/

function pintarCanvas(){
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height); //borrar un area especifica. los argumentos son (x,y,anchura,altura) x e y es desde donde borrar y anchura y altura cuanto va borrar desde el comienzo
    //Tomar en cuenta que canvas empieza desde la esquina superior izquierda
    lienzo.drawImage(  //drawImage(source, pos en x, pos en y, ancho, altura) estos son los valores de la imagen
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon();
        revisarColision(mokepon);
    })

    /*if (mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !==0){
        revisarColision(glavenusEnemigo);
        revisarColision(barrothEnemigo);
        revisarColision(lagiacrusEnemigo);
        revisarColision(valstraxEnemigo);
        revisarColision(NergiganteEnemigo);
    }*/

    
}; //ahora estas funcciones funcionan asi: La posicion empieza en 'x' al darle click o manteniendo a los botones se va sumando x + 5 sucesivamente pero al soltar el boton, 5 
//ahora vale 0 pero 'x' ya tiene un valor sumado por lo tanto se queda en esa posicion y asi se repite 

function enviarPosicion(x, y){
    fetch(`http://192.168.1.102:5500/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "content-Type": "application/json" //el cuerpo se enviara en formato JSON
        }, 
        body: JSON.stringify({ //convierte a una cadena JSON valida
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({ enemigos }){
                console.log(enemigos);
                mokeponesEnemigos = enemigos.map(function(enemigo){ //itera en cada elemento de la lista y retorna un nuevo array
                    let mokeponEnemigo = null;
                    const mokeponNombre = enemigo.mokepon.nombre || "";
                    if (mokeponNombre === "Lagiacrus"){
                        mokeponEnemigo = new Mokepon ('Lagiacrus', './assets/75d29aaa55fc85f4749ce7666d18280f-removebg-preview.png', 5, enemigo.id);
                    } else if (mokeponNombre === "Glavenus"){
                        mokeponEnemigo = new Mokepon ('Glavenus', './assets/glavenusBK.png' , 5, enemigo.id);
                    } else if (mokeponNombre === "Barroth") {
                        mokeponEnemigo = new Mokepon ('Barroth', './assets/barroth-removebg.png', 5, enemigo.id);
                    } else if (mokeponNombre === "Valstrax"){
                        mokeponEnemigo = new Mokepon ('Valstrax', './assets/valstrax-removebg-preview.png', 5, enemigo.id);
                    } else if (mokeponNombre === "Nergigante"){
                        mokeponEnemigo = new Mokepon ('Nergigante', './assets/nergigante.png',5, enemigo.id);
                    }
                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;

                    return mokeponEnemigo;

                })
            })
        }
    })
};

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
    /*glavenus.x = glavenus.x + 5;
    pintarCanvas();*/
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
    /*glavenus.y = glavenus.y - 5;
    pintarCanvas();*/
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
    /*glavenus.y = glavenus.y + 5;
    pintarCanvas();*/
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
    /*glavenus.x = glavenus.x - 5;
    pintarCanvas();*/
}

function detenerMovimiento() {
    
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function reiniciarJuego(){//reinicia la pagina
    location.reload();
};

function sePresionoUnaTecla(event){ //obtiene como parametro un event que es una variable que se crea automaticamente en respuesta a cualquier evento
    switch (event.key) { //event.key obtiene las teclas presionadas de cualquier evento producido
        case 'ArrowUp': //devuele ArrowUp por lo tanto el case verificara para hacer las funciones de mover segun las flechas
            moverArriba();
            break;
        case 'ArrowDown' :
            moverAbajo();
        break;
        case 'ArrowLeft' :
            moverIzquierda();
        break;
        case 'ArrowRight' :
            moverDerecha();
        break;
        default:
            break;
    }
};

function iniciarMapa(){

    mascotaJugadorObjeto = obtenerObjetoMascota();
    

    mapa.width = 900;
    mapa.height = 500;

    intervalo =setInterval(pintarCanvas, 50); //Ejecuta una funcion rapidamente despues de un intervalo de tiempo definido (funcion, tiempo en ms). La funcion sigue y sigue para verificar a cada momento las sumas de abajo de la posicion en canvas
    
    window.addEventListener('keydown', sePresionoUnaTecla); //añadir evento ('evento',funcion que hara ese evento)

    window.addEventListener('keyup', detenerMovimiento);
};

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJ === mokepones[i].nombre){ //Compara tipo y caracteres/numeros lo q tenga dentro XDDD el ===
            return mokepones[i] //retorna la mascota que encuentre donde sea igual a la seleccionada en el array
        }
    }
};

function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota= mascotaJugadorObjeto.y;
    const abajoMascota= mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota= mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota= mascotaJugadorObjeto.x;

    if(
        abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
        Swal.fire('Te has encontrado con : '+enemigo.nombre);
        detenerMovimiento();
        clearInterval(intervalo); //detengo la funcion interval en la variable intervalo guardado

        enemigoId = enemigo.id;
        seccionataque.style.display='flex'; //muestra la seccion asignada en la variable de estilo flex
        sectionVerMapa.style.display = 'none'       
        selectmascotaE(enemigo);
}

window.addEventListener('load', initgame); //evento de load page, osea cuando carga la pagina
 