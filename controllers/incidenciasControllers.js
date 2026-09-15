const incidencias = []; 
let siguienteId = 1; 
 
//Resgitro de incidencias
function registrarIncidencia(req, res) { 
    const { empleado, area, descripcion, prioridad } = req.body; 

    if (empleado.trim() === "") { 
        return res.status(400).json({ 
            mensaje: "El empleado es obligatorio" 
        }); 
    }    
    if (area.trim() === "") { 
        return res.status(400).json({ 
            mensaje: "El área es obligatoria" 
        }); 
    } 
    if (descripcion.trim() === "") { 
        return res.status(400).json({ 
            mensaje: "La descripción es obligatoria" 
        }); 
    } 
    if (prioridad !== "Alta" && 
        prioridad !== "Media" && 
        prioridad !== "Baja") { 

        return res.status(400).json({ 
            mensaje: "La prioridad debe ser Alta, Media o Baja" 
        }); 
    } 
 
    const nuevaIncidencia = { 
        id: siguienteId, 
        empleado: empleado, 
        area: area, 
        descripcion: descripcion, 
        prioridad: prioridad, 
        estado: "Pendiente" 
    }; 
 
    incidencias.push(nuevaIncidencia); 
    siguienteId++; 
 
    res.status(201).json(nuevaIncidencia); 
}

// Listar incidencias
function listarIncidencias(req, res) {
    res.status(200).json(incidencias);
}



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


module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaID,
    obtenerEstadisticas,
    clasificarIncidencias
};

