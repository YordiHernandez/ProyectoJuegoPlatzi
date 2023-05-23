const express = require("express"); //require permite exportar/utilizar las librerias que instalamos con npm express es una que ya viene en node
const cors = require("cors");

const app = express(); //almacena la aplicacion que recibe las peticiones del cliente, aplicacion con express
app.use(express.static('public')); //servir archivos estaticos , sirve para que esta carpeta pueda ser accesible desde el navegador web en la URL correspondiente
app.use(cors());//express ahora va usar cors

app.use(express.json()); //acepta contenidos json

const jugadores = []; //lista de jugadores, como array

class Jugador {
    constructor(id) {
        this.id = id;
    }

    asignarMokepon(mokepon){ //metodo
        this.mokepon = mokepon;
    }

    actualizarPosicion(x, y){
        this.x = x,
        this.y = y;
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;
    }

};//al construir una clase se debe llamar con mayuscula la primera letra

class Mokepon { //clases deben ir con mayuscula
    constructor(nombre) {
        this.nombre = nombre;
    }
};


app.get("/unirse" , (req, res) => { //en el url raiz reciba una peticion envie res ->hola, en unirse hara , /unirse es la url que asignamos que qeremos que haga la funcion
    const id = `${Math.random()}` //generar id
    
    const jugador = new Jugador(id); //nuevo objeto de la clase

    jugadores.push(jugador); //meto el nuevo objeto de la clase Jugador al array jugadores

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(id); //permite enviar una respuesta al cliente
});//cada vez que el cliente solicite un recurso se realizara algo (url, comovahacerlo, comovaresponder)

app.post("/mokepon/:jugadorId",(req, res)=> {

    const jugadorId = req.params.jugadorId || ""; //params accede a datos en la url
    const nombre = req.body.mokepon || "";
    const mokepon = new Mokepon (nombre);
                                                                                    //findIndex busca la posicion que devuelva la funcion creada y se guarda en jugador
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //el parametro es una funcion que revisa que jugadorId sea igual a jugador

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores);
    console.log(jugadorId);
    res.end();
})

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0; //obtengo el cuerpo de la req 
    const y = req.body.y || 0;

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //el parametro es una funcion que revisa que jugadorId sea igual a jugador

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }
                                    //representa cada elemento del array, luego funcion flecha sea pasa como argumento para filtrar
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id) //devuelve a todos los enemigos.

    res.send({
        enemigos
    });

})

app.post("/mokepon/:jugadorId/ataques",(req, res)=> {

    const jugadorId = req.params.jugadorId || ""; //params accede a datos en la url
    const ataques = req.body.ataques || [];
                                                                                    //findIndex busca la posicion que devuelva la funcion creada y se guarda en jugador
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id) //el parametro es una funcion que revisa que jugadorId sea igual a jugador

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end();
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId);

    res.send({
        ataques: jugador.ataques || []
    })

})

//inicializar servidor (puerto, funcion)
app.listen(5500, () => {   //escuche continuamente en el puerto 5500 las peticiones para que responda todo el tiempo
    console.log("Servidor funciona")
});

