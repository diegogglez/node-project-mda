const express = require('express');
const Kingdom = require('./kingdoms.model');
const router = express.Router();

//* Todos los reinos
router.get('/', async (req, res) =>{
  try {
    const allKingdoms = await Kingdom.find();
    return res.status(200).json(allKingdoms);
  } catch (error) {
    return res.status(500).json(error.message)
  }
});

module.exports = router;