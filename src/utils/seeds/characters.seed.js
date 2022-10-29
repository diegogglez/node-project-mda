const mongoose = require('mongoose');
const Character = require('../../api/characters/characters.model');
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const characters = [
  {
    name: "Sora",
    gender: "male",
    role: "light",
    weapons: "keyblade",
    img: "https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/2/2d/latest/20211005150420/Sora_SSBU.png/1200px-Sora_SSBU.png"
  },
  {
    name: "Kairi",
    gender: "female",
    role: "light",
    weapons: "keyblade",
    img: "https://freepngimg.com/download/kingdom_hearts/109513-kingdom-hearts-kairi-download-hq.png"
  },
  {
    name: "Riku",
    gender: "male",
    role: "light",
    weapons: "keyblade",
    img: "https://static.tvtropes.org/pmwiki/pub/images/riku_03_khiii_7.png"
  },
  {
    name: "Mickey",
    gender: "male",
    role: "light",
    weapons: "keyblade",
    img: "https://i.pinimg.com/originals/b3/97/45/b39745e36d5c13606ef4cc2c8a560167.png"
  },
  {
    name: "Donald",
    gender: "male",
    role: "light",
    weapons: "scepter",
    img: "https://static.wikia.nocookie.net/vsbattles/images/9/99/Donald04.png/"
  },
  {
    name: "Goofy",
    gender: "male",
    role: "light",
    weapons: "shield",
    img: "https://i.pinimg.com/originals/f9/cc/99/f9cc996b2d2c7063df9239e8dbd55e7f.gif"
  },
  {
    name: "Maleficent",
    gender: "female",
    role: "darkness",
    weapons: "darkness staff",
    img: "https://kh.wiki.gallery/images/thumb/2/27/Maleficent_KHIII.png/1200px-Maleficent_KHIII.png"
  },
  {
    name: "Xehanort",
    gender: "male",
    role: "darkness",
    weapons: "darkness keyblade",
    img: "https://kh.wiki.gallery/images/thumb/1/19/Master_Xehanort_KHIII.png/1200px-Master_Xehanort_KHIII.png"
  },
 
];

mongoose.connect(DB_URL)
  .then(async () => {
    const allCharacters = await Character.find().lean();
    if (!allCharacters.length) {
      console.log("No se encuentran personajes");
    } else {
      console.log(`Encontrados ${allCharacters.length} personajes`);
      await Character.collection.drop();
      console.log("Colección eliminada correctamente");
    }
  })
  .catch((err) => console.log("Error eliminando la colección -->", err))
  .then(async () => {
    await Character.insertMany(characters);
    console.log("Nuevos personajes añadidos con éxito");
  })
  .catch((err) => console.log("Error añadiendo los personajes", err))
  .finally(() => mongoose.disconnect());
