const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrar-chat', (data, callback) => {

        if (!data.nombre) {
            return callback({
                error: true,
                msg: 'Nombre / Sala es necesario'
            });
        }

        client.join(data.sala); // creacion de sala 

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('lista-personas', usuarios.getPersonasPorSalas(data.sala));
        client.broadcast.to(data.sala).emit('crear-mensaje', crearMensaje('Administrador', `${data.nombre} unió `));

        callback( usuarios.getPersonasPorSalas(data.sala) );

    });

    client.on('crear-mensaje', (data, callback) => {

        //otras opcioens 
        let persona = usuarios.getPersona( client.id )
        
        let mensaje = crearMensaje( persona.nombre, data.mensaje );

        client.broadcast.to(persona.sala).emit('crear-mensaje', mensaje);

        callback( mensaje );

    });

    client.on('disconnect', () => {
        let personBorrada = usuarios.borrarPersona(client.id) || '';

        client.broadcast.to(personBorrada.sala).emit('crear-mensaje', crearMensaje('Administrador', `${personBorrada.nombre} salió`));

        client.broadcast.to(personBorrada.sala).emit('lista-personas', usuarios.getPersonasPorSalas(personBorrada.sala));

    });

    //Mensaje privados
    client.on('mensaje-privado', data => {
        let persona = usuarios.getPersona( client.id );
        client.broadcast.to(data.para).emit('mensaje-privado', crearMensaje( persona.nombre, data.mensaje));
    });

});