console.log("PARTE A")

//01
let categorias = ["accion", "drama", "comedia", "terror"];

//02
for (let i = 0; i < categorias.length; i++) {
    console.log(categorias[i]);
}
console.log(categorias.length);

//03
let primerValor = categorias[0];
let ultimo = categorias[categorias.length - 1]
console.log('primer valor: ',primerValor,'segundo valor: ',ultimo);

//04
categorias.push('romance');
console.log(categorias.length);

//05
let elementoEliminado = categorias.pop();
console.log("el valor removido fue: ", elementoEliminado)

//06
let usuario = {
    nombre: 'santiago',
    edad: 20,
    ciudad: 'Posadas',
    temaFavorito:'comedia'
}

//07
console.log("Mi nombre es ", usuario.nombre, 'tengo ', usuario.edad, 'años, vivo en ', usuario.ciudad, ' y me gustan las de pelis de', usuario.temaFavorito);

//80
usuario.edad = 19;
console.log("Mi nombre es ", usuario.nombre, 'tengo ', usuario.edad, 'años, vivo en ', usuario.ciudad, ' y me gustan las de pelis de', usuario.temaFavorito);

//09
usuario['fecha'] = '2026';
console.log(usuario);

//10
let catalogo = [
    { 
        titulo: "Gladiador",
        categoria: "accion",
        puntaje: 9,
        visto: true
    },
    {
        titulo: 'IT',
        categoria: 'terror',
        puntaje: 7,
        visto: true
    },
    {
        titulo: 'la la land',
        categoria: 'drama',
        puntaje: 8,
        visto: false
    },
    {
        titulo: 'Son Como Niños',
        categoria: 'comedia',
        puntaje: 10,
        visto:true
    }
]


//11
console.log(catalogo[0].titulo);
console.log(catalogo[2].puntaje);


//12
let vistoOno
if (catalogo[1].visto === true) {
    vistoOno = 'visto';   
}else{
    vistoOno = 'pendiente'
}
console.log(catalogo[1].titulo, ' - ', catalogo[1].categoria, ' - ',  catalogo[1].puntaje, ' - ', vistoOno )


//13
console.log('ejercicio 13');
console.log('valor viejo: ', catalogo[3].puntaje);
catalogo[3].puntaje = 9;
console.log('valor actualizado: ',catalogo[3].puntaje);


//14
catalogo.push(
    {
        titulo: 'Harry Potter',
        categoria: 'fantasía',
        puntaje: 8,
        visto: false
    }
)
console.log('ejercicio 14');
console.log('cantidad de elementos: ',catalogo.length);


//15
let [{titulo : name, categoria: tipo, puntaje : valoracion, visto :verificado}] = catalogo;

if (verificado === true) {
    vistoOno = 'visto';   
}else{
    vistoOno = 'pendiente';
}
console.log('ejercicio 15');
console.log(name, ' - ', tipo, ' - ',  valoracion, ' - ', vistoOno );

//16
let { nombre, ciudad} = usuario;
console.log('ejerciciio 16');
console.log(nombre, ' - ', ciudad);

//17
let [primero, segundo] = catalogo;
console.log('ejercicio 17');
console.log("titulo del primer elemento: ", primero.titulo);
console.log("titulo del segundo elemento: ", segundo.titulo);

//18
let [,,{titulo: tituloDestacado}] = catalogo;
console.log('ejerciciio 18');
console.log(tituloDestacado);

//19
let [{premios = 1}] = catalogo;
console.log('ejerciciio 19');
console.log( 'premios: ', premios);

//20
[primero, segundo] = [segundo, primero];
console.log('ejercicio 20');
console.log("titulo del primer elemento: ", primero.titulo);
console.log("titulo del segundo elemento: ", segundo.titulo);