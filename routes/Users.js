const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");

const { Users } = require("../models");
// Login
// username = admin@admin
// password = adminintek

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    bcrypt.hash(password, saltRounds).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });

      res.json({ message: "Success Registered!" });
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Failed to Register!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "User doesn't exist!" });

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Password doen't match!" });

      const accessToken = sign(
        { username: user.username, id: user.id },
        "Secreet"
      );

      // res.json({ message: "Success Login!" });
      res.json(accessToken);
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Failed to Register!" });
  }
});

module.exports = router;
