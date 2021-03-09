require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(`./public`));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/shortUrls", require("./routes/urls"));

module.exports = app;
