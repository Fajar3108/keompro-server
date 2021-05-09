const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const db = require("./models");

const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Custome Cors ======================================
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

const { PORT = 3001 } = process.env;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`app listening at http://locahost:${PORT}`);
  });
});
