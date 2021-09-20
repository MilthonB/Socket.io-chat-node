const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');

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

    client.on('disconnect', () => {
        let personBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crear-mensaje', { usuario: 'administrado', mensaje: `${personBorrada} abandono el chat` });

        client.broadcast.emit('lista-personas', usuarios.getPersonas());

    });


});