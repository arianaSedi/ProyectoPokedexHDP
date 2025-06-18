// importamos la clase para manejar las estadisticas del pokemon
import estadisticas from "./Estadisticas.js";

// clase que representa un pokemon
class pokemon {
    // atributos privados
    #id;
    #name;
    #abilities;   // habilidades
    #types;       // tipos 
    #species;     // especie 
    #height;      // altura en cm
    #weight;      // peso en kg
    #weaknesses;  // debilidades 
    #eggGroups;   // grupos huevo o crias
    #stats;       // objeto estadisticas
    #color;       // color del pokemon 
    #moves;       // movimientos
    #image;       // url imagen normal
    #shiny;       // url imagen shiny
    #sound;       // sonido

    // constructor inicializa arreglos vacios y estadisticas
    constructor(){
        this.#abilities = [];
        this.#types = [];
        this.#weaknesses = [];
        this.#eggGroups = [];
        this.#stats = new estadisticas();
        this.#moves = [];
    }

    // metodos get para obtener valores
    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getAbilities() {
        return this.#abilities;
    }

    getTypes() {
        return this.#types;
    }

    getSpecies() {
        return this.#species;
    }

    getHeight() {
        return this.#height;
    }

    getWeight() {
        return this.#weight;
    }

    getWeaknesses() {
        return this.#weaknesses;
    }

    getEggGroups() {
        return this.#eggGroups;
    }

    getStats() {
        return this.#stats;
    }

    getColor() {
        return this.#color;
    }

    getMoves() {
        return this.#moves;
    }

    getImage() {
        return this.#image;
    }

    getShiny() {
        return this.#shiny;
    }

    getSound() {
        return this.#sound;
    }

    // setters
    setId(id) {
        this.#id = id;
    }

    setName(name) {
        this.#name = name;
    }

    addAbility(ability) {
        this.#abilities.push(ability);
    }

    addType(type) {
        this.#types.push(type);
    }

    setSpecies(species) {
        this.#species = species;
    }

    setHeight(height) {
        // API gives height in decimeters, convert to centimeters
        this.#height = height * 10;
    }

    setWeight(weight) {
        // API gives weight in hectograms, convert to kg
        this.#weight = weight / 10;
    }

    addWeakness(weakness) {
        this.#weaknesses.push(weakness);
    }

    addEggGroup(group) {
        this.#eggGroups.push(group);
    }

    setStats(statsObj) {
        this.#stats = statsObj;
    }

    setColor(color) {
        this.#color = color;
    }

    addMove(move) {
        this.#moves.push(move);
    }

    setImage(url) {
        this.#image = url;
    }

    setShiny(url) {
        this.#shiny = url;
    }

    setSound(url) {
        this.#sound = url;
    }


    // convierte el objeto pokemon a json para envio o almacenamiento
    toJSON(){
        return {
            id: this.#id,
            nombre: this.#name,
            tipos: this.#types,              
            especie: this.#species,          
            habilidades: this.#abilities,    
            altura: this.#height,            
            peso: this.#weight,              
            debilidades: this.#weaknesses,  
            grupos_huevo: this.#eggGroups,  
            estadisticas: this.#stats.toJSON(),
            color: this.#color,              
            movimientos: this.#moves.map(nombre => ({ nombre })),
            imagen: this.#image,             
            shiny: this.#shiny,              
            sonido: this.#sound              
        };
    }
}

export default pokemon;
