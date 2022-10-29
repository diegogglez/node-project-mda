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

module.exports = router;