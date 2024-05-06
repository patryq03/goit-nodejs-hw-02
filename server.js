const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const jwtStrategy = require("./config/jwt");

require("dotenv").config();

const { DB_HOST: urlDb } = process.env;

const connection = mongoose.connect(urlDb, { dbName: "db-contacts" });

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());
app.use(cors());

jwtStrategy();

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "something went wrong" });
  }
});

const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server started on http://localhost:3000");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();