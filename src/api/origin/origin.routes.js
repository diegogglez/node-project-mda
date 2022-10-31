const express = require('express');
const Origin = require('./origin.model');
const router = express.Router();

//* Todos los reinos
router.get('/', async (req, res) =>{
  try {
    const allOrigins = await Origin.find();
    return res.status(200).json(allOrigins);
  } catch (error) {
    return res.status(500).json(error.message)
  }
});

//* origin Por nombre

router.get('/getbyname/:name', async (req, res) =>{
  try {
    const name = req.params.name;
    const kingdomToFind = await Character.findOne({name: name});
    return res.status(200).json(kingdomToFind);
  } catch (error) {
    return res.status(500).json(`No se ha encontrado el reino :(`);
  }
});

//* origin por id

router.get('/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const kingdomToFind = await Character.findById(id).lean().populate('origin'); //dentro de populate va el nombre de la propiedad
    return res.status(200).json(kingdomToFind);
  } catch (error) {
    return res.status(500).json(`No se ha encontrado el personaje :(`);
  }
});



//* Crear un origin
router.post('/create', async (req, res) => {
  try {
    const origin = req.body;
    const newOrigin = new Origin(origin);
    const created = await newOrigin.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json('F en el chat')
    
  }
})

module.exports = router;
