const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrar-chat', (data, callback) => {

        if (!data.nombre) {
            return callback({
                error: true,
                msg: 'Nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre);

        client.broadcast.emit('lista-personas', usuarios.getPersonas());

        callback({ personas });

    });

    client.on('crear-mensaje', (data) => {

        //otras opcioens 
        let persona = usuarios.getPersona( client.id )
        
        let mensaje = crearMensaje( persona.nombre, data.mensaje );

        client.broadcast.emit('crear-mensaje', mensaje);

    });

    client.on('disconnect', () => {
        let personBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crear-mensaje', crearMensaje('Administrador', `${personBorrada.nombre} salió`));

        client.broadcast.emit('lista-personas', usuarios.getPersonas());

    });


});