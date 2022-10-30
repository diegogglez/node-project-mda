const express = require('express');
require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const cors = require("cors");

//?Rutas
const characterRoutes = require('./src/api/characters/characters.routes');
const kingdomsRoutes = require('./src/api/kingdoms/kingdoms.routes');
const originsRoutes = require('./src/api/origin/origin.routes');
const db = require('./src/utils/database/db');
db.connectDb();
const server = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})




const PORT = process.env.PORT;
server.use(express.json());

server.use(cors({
  origin: "*",
  credentials: true
}))

server.use('/characters', characterRoutes);
server.use('/kingdoms', kingdomsRoutes);
server.use('/origins', originsRoutes);


server.listen(PORT, () => {
  console.log(`El servidor funciona en http://localhost:${PORT}`);
})

