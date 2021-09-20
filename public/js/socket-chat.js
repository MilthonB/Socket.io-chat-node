let socket = io();


let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}


let usuario = {
    nombre : params.get('nombre'),
    sala : params.get('sala')
}


socket.on('connect', function () {
    console.log('Conectado al servidor', usuario);

    socket.emit('entrar-chat', usuario, ( resp  ) => {
        console.log('usuario conectados',resp);
    });

});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});




// Enviar información
// socket.emit('crear-mensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crear-mensaje', function (mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cambios de los us    uarios


socket.on('lista-personas', (personas) => {
    console.log(personas );
})

socket.on('mensaje-privado',(payload) =>  {
    console.log('mensaje info: ',payload);
});