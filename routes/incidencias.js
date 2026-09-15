const express = require('express'); 
const router = express.Router

const {
    registrarIncidencia, 
    listarIncidencias, 
    buscarIncidenciaID,
    obtenerEstadisticas,
    clasificarIncidencias, 
    cambiarEstado, 
    eliminarIncidencia,
    





} = require("../controllers/incidenciasControllers"); 
router.post('/', registrarIncidencia); 
router.get('/', listarIncidencias); 
router.get('/:id', buscarIncidenciaID); 
router.get('/estadisticas', obtenerEstadisticas); 
router.get('/:id/clasificacion', clasificarIncidencias); 
router.put('/:id/estado', cambiarEstado); 
router.delete('/:id', eliminarIncidencia); 

module.exports = router; 