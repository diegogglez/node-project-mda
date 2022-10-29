const mongoose = require("mongoose");
const Origin = require("../../api/origin/origin.model");
require("dotenv").config();
const DB_URL  = process.env.DB_URL;

const origins = [
  {
    name: "Kingdom Hearts",
    firstAppearance: "Kingdom Hearts Saga"
  },
  {
    name: "Aladdin",
    firstAppearance: "Kingdom Hearts"
  },
  {
    name: "Arendelle",
    firstAppearance: "Kingdom Hearts 3"
  },
  {
    name: "Lion King",
    firstAppearance: "Kingdom Hearts 2"
  },
  {
    name: "Little Mermaid",
    firstAppearance: "Kingdom Hearts"
  },
  {
    name: "Snow White",
    firstAppearance: "Kingdom Hearts: Birth by Sleep"
  },
  {
    name: "Nightmare Before Christmas",
    firstAppearance: "Kingdom Hearts"
  },
  {
    name: "Rapunzel",
    firstAppearance: "Kingdom Hearts 2"
  },
];

mongoose.connect(DB_URL)
  .then(async () => {
    const allOrigins = await Origin.find().lean();
    if (!allOrigins.length) {
      console.log("Origen no encontrado");
    } else {
      console.log(`Datos encontrados`);
      await Origin.collection.drop();
      console.log("Colección eliminada correctamente");
    }
  })
  .catch((err) => console.log("Error eliminando la colección -->", err))
  .then(async () => {
    await Origin.insertMany(origins);
    console.log("Nuevos reinos añadidos con éxito");
  })
  .catch((err) => console.log("Error añadiendo datos", err))
  .finally(() => mongoose.disconnect());