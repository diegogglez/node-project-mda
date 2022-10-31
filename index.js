const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require("cors");

//?Rutas
const characterRoutes = require('./src/api/characters/characters.routes');
const kingdomsRoutes = require('./src/api/kingdoms/kingdoms.routes');
const originsRoutes = require('./src/api/origin/origin.routes');
const userRoutes = require('./src/api/users/user.routes');
const db = require('./src/utils/database/db');
require("dotenv").config();
db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


const server = express();
const PORT = process.env.PORT;

server.use(cors({
  origin: "*",
  credentials: true
}));


server.use(express.json({limit: "5mb"}));

server.use(express.urlencoded({ extended: false }));

server.use('/characters', characterRoutes);
server.use('/kingdoms', kingdomsRoutes);
server.use('/origins', originsRoutes);
server.use('/users', userRoutes);



server.listen(PORT, () => {
  console.log(`El servidor funciona en http://localhost:${PORT}`);
})

