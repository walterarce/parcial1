'use strict';

/*
 * Arce, Walter
 */

// Ejemplo de la estructura de un disco:
// let disco = {
//     Nombre: 'El lado oscuro de la Programación',
//     Autor: 'Los Programadores Anónimos',
//     'Código': 1,
//     Pistas: [
//         {
//             Nombre: 'Esa cajita loca llamada variablecita',
//             'Duración': 200,
//         },
//         {
//             Nombre: 'Nunca quise ser un NaN',
//             'Duración': 180,
//         },
//         {
//             Nombre: 'No quiero programar',
//             'Duración': 90,
//         },
//         {
//             Nombre: 'Bajo presión',
//             'Duración': 240,
//         },
//         {
//             Nombre: 'La odisea de las variables privadas',
//             'Duración': 120,
//         },
//         {
//             Nombre: 'Sr. Programador',
//             'Duración': 720,
//         },
//     ],
// };

// Discos:
let discos = [];
let duracionTotal=0;

class pista {
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }
}

class disco {
    constructor(nombre, autor, codigo) {
        this.nombre = nombre;
        this.autor = autor;
        this.codigo = codigo;
        this.pistas = []=[];
    }
    duracion=0;
    pistaMayorDuracion="";
    agregarPista(pista) {
        this.pistas.push(pista);
    }
}
// Función Cargar:
const Cargar = () => {
    let nombredisco;
        do {
            nombredisco= prompt('Ingrese nombre del disco:');
        }while(validarTextos(nombredisco,'Nombre del disco'))

    let autor;
        do {
            autor= prompt('Ingrese nombre del autor:');
        }while(validarTextos(autor,'Nombre autor'))

    let codigo;

    do {
        codigo = parseInt(prompt('Ingrese código del disco (debe ser un número):'));
    }while(validarNumerosyRangos(codigo,'codigo'));

    let miDisco = new disco(nombredisco, autor, codigo);
    do {
        let pistaInput;
        do {
            pistaInput = prompt('Ingrese nombre de la pista:');
        }while(validarTextos(pistaInput,'Nombre pista'));

        let duracionInput;

        do {
             duracionInput = parseInt(prompt('Ingrese duracion:'));
        }while(validarNumerosyRangos(duracionInput,'duracion'));
        duracionTotal+=duracionInput;
        let pistaobj = new pista(pistaInput, duracionInput);

        miDisco.agregarPista(pistaobj);

    } while(confirm('Desea cargar una nueva pista?'));
    miDisco.duracion +=  duracionTotal;
    miDisco.pistaMayorDuracion = buscarpistaMayorDuracion(miDisco.pistas);
    discos.push(miDisco);
    duracionTotal=0;
    let discosCargados = validarDiscos(discos); // llama a la función validar y guarda el resultado en una variable
    if (!discosCargados) {
        alert('Debe cargar al menos un disco para continuar!');
    }
};


// Función Mostrar:
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let imgSrc = "img";
    let html = ``;
    html += `<h2>Cantidad de discos:${discos.length}</h2>`
    html +=`<div class="gallery">`;

    for (const disco of discos){

        html += `<spam>`;
        html+= `<img  src="${imgSrc}/dummy-image.jpg" alt="imagen dummy">`;
        html += `<p><h3>Nombre Albúm: ${disco.nombre}</h3></p>`;
        html += `<p>Autor: ${disco.autor}</p>`;
        html += `<p>Codigo: ${disco.codigo}</p>`;
        html += `<hr>`;
        html += `Pista/s (${disco.pistas.length}):`
        let duracionFormateada;
        for (const pista of disco.pistas) {
            html += `<ul><li><h4>Nombre: ${pista.nombre}<h4></li>`;
            duracionFormateada =  pista.duracion>180? html += `<li class="duracionResaltado">Duración de la lista: ${pista.duracion}</li>`:
                html += `<li>Duración de la pista: ${pista.duracion}</li>`;
            html += `</ul>`;
        }
        html += `<hr>`;
        html += `<ul><li>Duración total del disco: (${disco.duracion}):</li>`
        html += `<li>Promedio duración: (${Math.round(disco.duracion/discos.length)}):</li>`
        html += `<li>Nombre de la pista de mayor duración: (${disco.pistaMayorDuracion})</li></ul>`
        html += `</spam>`;

    }

    html +=`</div>`;

    // Cositas:

    // Si modificaste el nombre de la variable para ir armando la cadena, también hazlo acá:
    document.getElementById('info').innerHTML = html; // <--- ahí es acá
};

// Todas las funciones que necesites:
const validarTextos = (texto,nombreDato) => {
    if (typeof texto === "undefined" || texto === null || texto.trim() === "") {
        alert(`Debe ingresar un texto para ${nombreDato}`);
        return true;
    }
    return false;
};

const validarDiscos = (discos) => {
    return discos.length > 0; // Devuelve true si hay discos en el array, false si está vacío
}
const validarNumerosyRangos = (datoValidar,tipoValidacion) => {

    let codigoExistente;
    if (tipoValidacion==='codigo')
    {
        codigoExistente= discos.some(disco => disco.codigo === datoValidar);
    }

    let codigoValido = isNaN(datoValidar);
    let rangoNumericoMaximo = 999; // máximo valor permitido para el código
    let rangoNumericoMinimo = 1; // mínimo valor permitido para el código

    if ((datoValidar > rangoNumericoMaximo || datoValidar < rangoNumericoMinimo) && tipoValidacion==='codigo') {
        alert(`El valor debe estar entre ${rangoNumericoMinimo} y ${rangoNumericoMaximo}.`);
        return true; // retorna true si el valor está fuera del rango permitido
    }

    if (codigoExistente && tipoValidacion==='codigo') {
        alert('El código ingresado ya existe. Ingrese otro.');
    }

    if (codigoValido && datoValidar !== null) {
        console.log('datos1',datoValidar, rangoNumericoMaximo, rangoNumericoMinimo);
        alert('Debe ingresar números solamente y no debe ingresar datos sin su valor.');
        return true; // retorna true si el dato ingresado no es un número o si es null
    }

    // Validar duración:
    let duracionMaxima = 7200; // máximo valor permitido para la duración
    let duracionMinima = 0; // mínimo valor permitido para la duración

    if (datoValidar > duracionMaxima || datoValidar < duracionMinima && tipoValidacion==='duracion') {
        console.log('datos',datoValidar, duracionMaxima, duracionMinima);
        alert(`La duración debe estar entre ${duracionMinima} y ${duracionMaxima}.`);
        return true; // retorna true si la duración está fuera del rango permitido
    }

    return codigoExistente;
}
const buscarpistaMayorDuracion = (pistas) => {
    let mayorduracion = 0;
    let pistaMayor = null;

    for (let i = 0; i < pistas.length; i++) {
        if (pistas[i].duracion > mayorduracion) {
            mayorduracion = pistas[i].duracion;
            pistaMayor = pistas[i].nombre;
        }
    }

    return pistaMayor;
};
const FiltrarPorCodigo = () => {
    const codigoInput = document.getElementById('codigo-input').value;
    const discosFiltrados = discos.filter((disco) => disco.codigo === parseInt(codigoInput));
    MostrarDiscosFiltrados(discosFiltrados);
};

const MostrarDiscosFiltrados = (discosFiltrados) => {
    let imgSrc = "img";
    let html = `<h2>Discos filtrados (${discosFiltrados.length}):</h2>`;
    html += `<div class="gallery">`;

    for (const disco of discosFiltrados) {
        html += `<spam>`;
        html += `<img src="${imgSrc}/dummy-image.jpg" alt="imagen dummy">`;
        html += `<p><h3>Nombre Álbum: ${disco.nombre}</h3></p>`;
        html += `<p>Autor: ${disco.autor}</p>`;
        html += `<p>Código: ${disco.codigo}</p>`;
        html += `<hr>`;
        html += `Pista/s (${disco.pistas.length}):`
        let duracionFormateada;
        for (const pista of disco.pistas) {
            html += `<ul><li><h4>Nombre: ${pista.nombre}<h4></li>`;
            duracionFormateada = pista.duracion > 180 ? `<li class="duracionResaltado">Duración de la lista: ${pista.duracion}</li>` :
                `<li>Duración de la pista: ${pista.duracion}</li>`;
            html += `${duracionFormateada}</ul>`;
        }
        html += `<hr>`;
        html += `<ul><li>Duración total del disco: (${disco.duracion}):</li>`
        html += `<li>Promedio duración: (${Math.round(disco.duracion / discosFiltrados.length)}):</li>`
        html += `<li>Nombre de la pista de mayor duración: (${disco.pistaMayorDuracion})</li></ul>`
        html += `</spam>`;
    }

    html += `</div>`;

    document.getElementById('info').innerHTML = html;
};
