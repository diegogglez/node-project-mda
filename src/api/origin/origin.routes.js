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