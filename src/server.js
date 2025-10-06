const express = require('express');
const greRoutes = require('./routes/greRoutes');

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use('/api', greRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
