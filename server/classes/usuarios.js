




class Usuarios {

    constructor(){
        this.personas = [];
    }


    agregarPersona(id, nombre){
        let persona = { id, nombre };

        this.personas.push(persona);


        return this.personas;
    }


    getPersona( id ) {
        let persona = this.personas.filter( persona => persona.id = id )[0];

        return persona;
    }


    getPersonas(){
        return this.personas;
    }


    getPErsonasPorSalas( salda ){

    }

    borrarPersona( id ){

        let personaBorrarda = this.getPersona(id);

        this.personas = this.personas.filter(persona =>  persona.id !== id);

        return personaBorrarda;
    }

}


module.exports = {
    Usuarios
}