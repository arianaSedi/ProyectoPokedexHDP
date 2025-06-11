// Clase que representa las estadisticas de un Pokemon
class Estadisticas {

    // Atributos privados para cada estadistica
    #hp;
    #attack;
    #defense;
    #special_attack;
    #special_defense;
    #speed;

    // Constructor vacio 
    constructor() {

    }

    // Metodos getters para obtener cada estadistica

    getHP(){
        return this.#hp; // Retorna los puntos de vida
    }

    getAttack(){
        return this.#attack; // Retorna el ataque fisico
    }

    getDefense(){
        return this.#defense; // Retorna la defensa fisica
    }

    getSpecialAttack(){
        return this.#special_attack; // Retorna el ataque especial
    }

    getSpecialDefense(){
        return this.#special_defense; // Retorna la defensa especial
    }

    getSpeed(){
        return this.#speed; // Retorna la velocidad
    }

    // Metodos setters para asignar valores a cada estadistica

    setHP(hp){
        this.#hp = hp; // Asigna puntos de vida
    }

    setAttack(attack){
        this.#attack = attack; // Asigna ataque fisico
    }

    setDefense(defense){
        this.#defense = defense; // Asigna defensa fisica
    }

    setSpecialAttack(special){
        this.#special_attack = special; // Asigna ataque especial
    }

    setSpecialDefense(special){
        this.#special_defense = special; // Asigna defensa especial
    }

    setSpeed(speed){
        this.#speed = speed; // Asigna velocidad
    }

    // Metodo que convierte el objeto en un JSON para facilitar su uso
    toJSON() {
        return {
            vida: this.#hp,
            ataque: this.#attack,
            defensa: this.#defense,
            ataque_especial: this.#special_attack,
            defensa_especial: this.#special_defense,
            velocidad: this.#speed
        };
    }
}

// Exporta la clase para usarla en otros modulos
export default Estadisticas;
