require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = 4500;
const app = express();

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);

  mongoose
    .connect("mongodb://localhost:27017/inventory", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => console.log(err));
});
