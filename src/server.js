const express = require('express');
const greRoutes = require('./routes/greRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7000;

// Configurar CORS para permitir solicitudes desde una IP específica
app.use(cors({
  //origin: 'http://192.168.10.138:7001' // Reemplaza con la IP y puerto de tu cliente (e.g., donde se ejecuta index.html)
   origin: '*' // Descomentar esta línea para permitir solicitudes desde cualquier IP
}));

app.use(express.json());
app.use('/api', greRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
