const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Testing server..");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
