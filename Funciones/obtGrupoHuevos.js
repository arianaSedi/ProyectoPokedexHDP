const obtGrupoHuevos = (dtEspecie) => {

    const eggsGroup = [];

    const groupsArray = dtEspecie.egg_groups;

    for (let i = 0; i < groupsArray.length; i++) {
        
        eggsGroup.push(groupsArray[i].name);
    }

    return eggsGroup;

}

export default obtGrupoHuevos;