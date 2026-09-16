const {
    validarCamposIncidencia,
    esPrioridadValida,
    esEstadoValido
    
} = require ('../utils/helpers')

const incidencias = []; 
let siguienteId = 1; 
 
//Resgitro de incidencias
function registrarIncidencia(req, res) { 
    const { empleado, area, descripcion, prioridad } = req.body; 
    const validacion = validarCamposIncidencia(req.body); 
    
    if (!validacion.valido){
        return res.status(400).json({mensaje: validacion.mensaje})
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

// Buscar incidencia por ID
function buscarIncidenciaID(req, res) {

    const id = parseInt(req.params.id);
    const incidencia = incidencias.find(function (incidencia) {
        return incidencia.id === id;
    });

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    res.status(200).json(incidencia);
}

//Cambiar estado de incidencia
const cambiarEstado = (req, res) => {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    const index = incidencias.findIndex((inc) => inc.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    if (!estado || estado.trim() === "") {
        return res.status(400).json({ mensaje: "El campo estado es obligatorio" });
    }
    if (!esEstadoValido(estado)){
        return res.status(400).json({mensaje:'Estado no valido'})
    }
    switch (estado) {
        case "Pendiente":
        case "En Proceso":
        case "Resuelta":
        case "Cancelada":
            incidencias[index].estado = estado;
            return res.status(200).json({
                mensaje: "Estado actualizado correctamente",
                incidencia: incidencias[index]
            });

        default:
            return res.status(400).json({
                mensaje: "Estado no válido. Use: Pendiente, En Proceso, Resuelta o Cancelada"
            });
    }
};

//Eliminar incidencia
const eliminarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    const index = incidencias.findIndex((inc) => inc.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const [incidenciaEliminada] = incidencias.splice(index, 1);

    return res.status(200).json({
        mensaje: "Incidencia eliminada correctamente",
        incidencia: incidenciaEliminada
    });
};


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
    const incidencia = incidencias.find(i => i.id === id);

    if(!incidencia){
        return res.status(404).json({ mensaje: "Incidencia no encontrada"});
    }

    let clasificacion;
    switch(incidencia.prioridad) {
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
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencias
};

