const express = require('express');
const Kingdom = require('./kingdoms.model');
const router = express.Router();
/* const { isAuth, isAdmin } = require('../../middlewares/auth'); */
const upload = require('../../middlewares/file');
const { deleteFile } = require('../../middlewares/deleteFile');

//* Todos los reinos
router.get('/', async (req, res) =>{
  try {
    const allKingdoms = await Kingdom.find();
    return res.status(200).json(allKingdoms);
  } catch (error) {
    return res.status(500).json(error.message)
  }
});

//* Reino por id
router.get('/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const kingdomToFind = await Kingdom.findById(id).lean(); //dentro de populate va el nombre de la propiedad
    return res.status(200).json(kingdomToFind);
  } catch (error) {
    return res.status(500).json(`No se ha encontrado el Reino :(`);
  }
});

//* Reino pon nombre
router.get('/getbyname/:name', async (req, res) =>{
  try {
    const name = req.params.name;
    const kingdomToFind = await Kingdom.findOne({name: name});
    return res.status(200).json(kingdomToFind);
  } catch (error) {
    return res.status(500).json(`No se ha encontrado el Reino :(`);
  }
});

//* Crear un reino
router.post("/create", upload.single('img') ,async(req, res) =>{  
  try { 
    const kingdom = req.body;
    if (req.file) {
      kingdom.img = req.file.path;
    }
    const newKingdom = new Kingdom(kingdom);
    const created = await newKingdom.save();
    return res.status(201).json(created);

  } catch (err) {
    return res.status(500).json("Error al crear el Reino");
    
  }
});

//* Eliminar un reino por id
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const KingdomToDelete = await Kingdom.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar el Reino");
  } catch (error) {
    return res.status(500).json('Error al borrar el Reino');
  }
});

//* Eliminar un reino por nombre
router.delete('/delete/:name', async (req, res) => {

  try {
    const name = req.params.name;
    const kingdomToDelete = await Kingdom.findOneAndDelete({name: name});
    return res.status(200).json("Se ha conseguido borrar el personaje");
  } catch (error) {
    return res.status(500).json('Error al borrar el personaje');
  }
});

module.exports = router;

//* FUNCIÓN QUE EDITA UN REINO
router.put('/edit/:id', upload.single("img"), async (req, res) => {

  try {
    const id = req.params.id;
    const kingdom = req.body;
    const oldKingdom = await Kingdom.findById(id);
    if (req.file) {
      if (oldKingdom.img) {
        deleteFile(oldKingdom.img);
      }
      Kingdom.img = req.file.path;
    }
    const kingdomModify = new Kingdom(kingdom);
    kingdomModify._id = id;
    const kingdomUpdated = await Kingdom.findByIdAndUpdate(id, kingdomModify);
    return res.status(200).json({mensaje: "Se ha conseguido editar el personaje", kingdomModificado: kingdomUpdated});
  } catch (error) {
    return res.status(500).json('Error al editar el personaje');
  }

});

module.exports = router;

module.exports = router;