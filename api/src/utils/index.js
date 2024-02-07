const depuracionDeLaInfo = (array) => { // LIMPIO LA INFO QUE TRAIGO DE MI API PARA UTILIZAR SOLO LO QUE MEIMPORTA.
    return array.map((element) => {

        return {
            id: element.id,
            name: element.name,
            height: element.height.metric,
            weight: element.weight.metric,
            life_span: element.life_span,
            temperament: element.temperament,
            image: element.image.url,
            created: false  
        }
    })
}

module.exports={
    depuracionDeLaInfo
}