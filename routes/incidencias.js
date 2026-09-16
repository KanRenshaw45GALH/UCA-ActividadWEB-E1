const express = require('express'); 
const router = express.Router();

const {
    registrarIncidencia, 
    listarIncidencias, 
    buscarIncidenciaID,
    obtenerEstadisticas,
    clasificarIncidencias, 
/*
    cambiarEstado, 
    eliminarIncidencia,
*/
    
} = require("../controllers/incidenciasControllers"); 
router.post('/registrar', registrarIncidencia); 
router.get('/listar', listarIncidencias); 
router.get('/estadisticas', obtenerEstadisticas); 
router.get('/:id/clasificacion', clasificarIncidencias); 
router.get('/listar/:id', buscarIncidenciaID); 
/*
router.put('/cambiarEstado/:id/estado', cambiarEstado); 
router.delete('/eliminar/:id', eliminarIncidencia); 
*/

module.exports = router; 