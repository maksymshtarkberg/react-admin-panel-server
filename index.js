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
      "mongodb+srv://barberrybar:Mb4BYDmbVgHc3Dsn@cluster0.egdpv1u.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log("Server is running on port:", PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
