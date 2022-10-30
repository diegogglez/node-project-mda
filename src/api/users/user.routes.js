const express = require("express");
const User = require("./user.models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");

//* Todos los uruarios
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//* Crear un usuario
router.post("/postNewUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    const created = await newUser.save();
    return res.status(200).json(created);
  } catch (err) {
    return res.status(500).json("Error al crear el usuario");
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDb = await User.findOne({ email: req.body.email });
    if (!userDb) {
      return res.status(404).json("No existe el usuario");
    }
    if (bcrypt.compareSync(req.body.password, userDb.password)) {
      const token = generateSign(userDb._id, userDb.email);
      return res.status(200).json({ token, userDb });
    } else {
      return res.status(500).json("Que no tio que NO, pa tu casa");
    }
  } catch (error) {
    return res.status(500).json("Error al loguear el usuario");
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
