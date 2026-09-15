const incidencias = [];

// Estadisticas
const obtenerEstadisticas = (req, res) => {
    res.json({
        totalIncidencias : incidencias.length,
        pendientes : incidencias.filter(i => i.estado === "Pendiente").length,
        enProceso : incidencias.filter(i => i.estado === "En Proceso").length,
        resueltas : incidencias.filter(i => i.estado === "Resuelta").length,
        canceladas : incidencias.filter(i => i.estado === "Cancelada").length
    });
};

// Clasificacion de incidencias
const clasificarIncidencias = (req, res) => {
    const id = parseInt(req.params.id);
    const incidencia = incidencia.find(i => i.id === id);

    if(!incidencia){
        return res.status(404).json({ mensaje: "Incidencia no encontrada"});
    }

    let clasificacion;
    switch(incidencias.prioridad) {
        case "Alta" :  clasificacion = "Crítica"; 
        break;
        case "Media" : clasificacion = "Importante";
        break;
        case "Baja" : clasificacion = "Normal";
        break;
    }
    
    res.json({ id: incidencia.id, clasificacion});
};


module.exports{
    obtenerEstadisticas,
    clasificarIncidencias
}

