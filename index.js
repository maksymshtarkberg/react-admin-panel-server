const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const authRouter = require("./authRouter");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://plens:k73couYMhGKQMEHd@cluster0.q1b29nr.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, console.log("success"));
  } catch (error) {
    console.log(error);
  }
};

start();
