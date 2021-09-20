const { io } = require('../server');

const {Usuarios} = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrar-chat', (data, callback) => {
        console.log('usuario', data);

        if (!data.nombre) {
            return callback({
                error: true,
                msg: 'Nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona( client.id, data.nombre );

       callback({personas});

    });


});