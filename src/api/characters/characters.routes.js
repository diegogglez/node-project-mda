const express = require('express');
const Character = require('./characters.model');
const router = express.Router();

//* Todos los personajes
router.get('/', async (req, res) =>{
  try {
    const allCharacters = await Character.find();
    return res.status(200).json(allCharacters);
  } catch (error) {
    return res.status(500).json(error.message)
  }
});

//* Personaje por id
router.get('/:id', async (req, res) =>{
  try {
    const id = req.params.id;
    const characterToFind = await Character.findById(id);
    return res.status(200).json(characterToFind);
  } catch (error) {
    return res.status(500).json(`No se ha encontrado el personaje :(`);
  }
});

//* Personaje por nombre
router.get('/getByName/:name', async (req, res) =>{
  try {
    const name = req.params.name;
    const characterToFind = await Character.findOne({name: name});
    return res.status(200).json(characterToFind);
  } catch (error) {
    return res.status(500).json(`No se ha encontrado el personaje :(`);
  }
});

//* Crear un personaje
router.post('/create', async(req, res) => {
  try {
    const character = req.body;
    const newCharacter = new Character(character);
    const created = await newCharacter.save();
    return res.status(201).json(created);

  } catch (error) {
    return res.status(500).json('Error al crear el personaje :(');
  }
});

//* Eliminar un personaje por id
router.delete('/delete/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const characterToDelete = await Character.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar el personaje");
  } catch (error) {
    return res.status(500).json('Error al borrar el personaje');
  }
});

//* Eliminar un personaje por nombre
router.delete('/delete/:name', async (req, res) => {

  try {
    const name = req.params.id;
    const characterToDelete = await Character.findOneAndDelete({name: name});
    return res.status(200).json("Se ha conseguido borrar el personaje");
  } catch (error) {
    return res.status(500).json('Error al borrar el personaje');
  }
});

module.exports = router;

