//funncion para obtener debilidades
const obtDebilidades = async (array) => {
//arreglo para guardar debilidades 
    const debilidades = [];

    const opciones = {
        method: 'GET'
    };
        //Recorremos cada tipo que tiene el Pokémon 
    for (let i = 0; i < array.length; i++) {

        const response = await fetch(array[i].type.url, opciones);
        //convertir en json
        const data = await response.json();
        //recorrer las debilidades 
        const debilidadesAPI = data.damage_relations.double_damage_from;

        for (let j = 0; j < debilidadesAPI.length; j++) {

            //Si la debilidad aún no está en el arreglo, la agregamos (evita duplicados)
            if (!debilidades.includes(debilidadesAPI[j].name)) {
                debilidades.push(debilidadesAPI[j].name);
            }

        }
    }
    //devuelve las debilidades 

    return debilidades;

}
//se exporta  para que se pueda seguir usando  en otros Archivos
export default obtDebilidades;