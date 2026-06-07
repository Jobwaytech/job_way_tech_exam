const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();


app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

mongoose.connect("mongodb+srv://jobwaytech_db_user:cmgMI89gsU1UgbLT@cluster0.hdgozie.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000,"0.0.0.0", () => {
  console.log(`Backend running on http://localhost:5000`);
});

 
 


