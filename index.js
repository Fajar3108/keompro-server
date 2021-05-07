const express = require("express");

const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const db = require("./models");

const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });

app.get("/", (req, res) => {
  res.send("Welcome to KOEMPRO REST API");
});

app.use("/posts", require("./routes/Posts"));
app.use("/auth", require("./routes/Users"));
app.use("/members", require("./routes/Members"));

let port = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Connected" + port);
  });
});
