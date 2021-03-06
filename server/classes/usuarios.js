




class Usuarios {

    constructor(){
        this.personas = [];
    }


    agregarPersona(id, nombre, sala){
        let persona = { id, nombre, sala };

        this.personas.push(persona);


        return this.personas;
    }


    getPersona( id ) {
        let persona = this.personas.filter( persona => persona.id === id )[0];

        return persona;
    }


    getPersonas(){
        return this.personas;
    }


    getPersonasPorSalas( sala ){
        let personas = this.personas.filter( persona => persona.sala === sala );
        console.log('Las personas',personas, sala);
        return personas;
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