const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config({path: "./.env"});

app.use(express.json({extended: false}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB connection successful??"));

const PORT = process.env.PORT || 5000;

// Define Routes
app.use("/logs", require("./src/routes/logs"));
app.use(`/techs`, require("./src/routes/techs"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
