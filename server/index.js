require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const port = process.env.PORT || 4500;
const app = express();

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/sku", async (req, res) => {
  const { sku } = req.body;
  try {
    const { data } = await axios.post(
      "https://api.upcitemdb.com/prod/trial/lookup",
      `{ "upc": "${sku}" }`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip",
        },
      }
    );

    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);

  // mongoose
  //   .connect("mongodb://localhost:27017/inventory", {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  //   .then(() => {
  //     console.log("connected to mongodb");
  //   })
  //   .catch((err) => console.log(err));
});
