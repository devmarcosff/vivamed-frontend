const types = () => {
    const allTypes = {
        adm: 'admin',
        caps: {
            coordenador: 'coordenadorcaps',
            administrativo: 'administrativocaps',
            medico: 'medicocaps',
            enfermeiro: 'enfermeirocaps',
            farmaceutico: 'farmaceuticocaps'
        },
        farmacia: {
            coordenador: 'coordenadorfarmacia',
            administrativo: 'administrativofarmacia',
            medico: 'medicofarmacia',
            enfermeiro: 'enfermeirofarmacia',
            farmaceutico: 'farmaceuticofarmacia'
        }
    }

    return allTypes;
}

export default types;