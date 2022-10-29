const express = require('express');
require("dotenv").config();
//?Rutas
const characterRoutes = require('./src/api/characters/characters.routes');
const kingdomsRoutes = require('./src/api/kingdoms/kingdoms.routes');
const originsRoutes = require('./src/api/origin/origin.routes');
const db = require('./src/utils/database/db');
db.connectDb();
const server = express();


const PORT = process.env.PORT;
server.use(express.json());

server.use('/characters', characterRoutes);
server.use('/kingdoms', kingdomsRoutes);
server.use('/Origins', originsRoutes);


server.listen(PORT, () => {
  console.log(`El servidor funciona en http://localhost:${PORT}`);
})

