const express = require('express');
const incidenciasRoutes = require('./routes/incidencias.js');

const app = express();
const port = 3126;

app.use(express.json());
app.use('/api/incidencias', incidenciasRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});