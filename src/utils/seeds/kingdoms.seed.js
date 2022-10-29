const mongoose = require("mongoose");
const Kingdom = require("../../api/kingdoms/kingdoms.model");
require("dotenv").config();
const DB_URL  = process.env.DB_URL;

const kingdoms = [
  {
    name: "Destiny Islands",
    img: "https://thumb.sfmlab.com/item-preview/projectfile/Destiny_Islands_2_thumb.detail.png"
  },
  {
    name: "Hollow Bastion",
    img: "https://i1.sndcdn.com/artworks-000208557656-uu575a-t500x500.jpg"
  },
  {
    name: "Agrabah",
    img: "https://celebrity.fm/wp-content/uploads/2022/02/Does-Jasmine-live-in-a-castle-732x549.jpg"
  },
  {
    name: "Scala Ad Caelum",
    img: "https://static.actugaming.net/media/2020/01/Kingdom-hearts-III-remind-9.jpg"
  },
  {
    name: "Atlantica",
    img: "https://images2.alphacoders.com/575/575258.png"
  },
  {
    name: "Disney Castle",
    img: "https://i.pinimg.com/originals/58/c9/6e/58c96e2a54836d0afaba5bdbe2e5b0af.png"
  },
  {
    name: "Halloween Town",
    img: "https://i.pinimg.com/originals/58/c9/6e/58c96e2a54836d0afaba5bdbe2e5b0af.png"
  },
  {
    name: "The Caribbean",
    img: "https://img.youtube.com/vi/fn5WNxy-Wcw/maxresdefault.jpg"
  },
 
 
];

mongoose.connect(DB_URL)
  .then(async () => {
    const allKingdoms = await Kingdom.find().lean();
    if (!allKingdoms.length) {
      console.log("No se ha encontrado ningún reino");
    } else {
      console.log(`Encontrados ${allKingdoms.length} reinos`);
      await Kingdom.collection.drop();
      console.log("Colección eliminada correctamente");
    }
  })
  .catch((err) => console.log("Error eliminando la colección -->", err))
  .then(async () => {
    await Kingdom.insertMany(kingdoms);
    console.log("Nuevos reinos añadidos con éxito");
  })
  .catch((err) => console.log("Error añadiendo reinos", err))
  .finally(() => mongoose.disconnect());
