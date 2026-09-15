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

module.exports{
    obtenerEstadisticas
}

