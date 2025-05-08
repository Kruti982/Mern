const express = require("express");
const db = require("./MongoDb/Mongo");
const app = express();
const port = 5000;
// const mongoose = require("mongoose");
const User = require("./models/Users");
const connectDB = require("./MongoDb/Mongo");

const cors = require("cors");
app.use(cors());

app.use(express.json());
connectDB();
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, lastName, phone, email, password } = req.body;

  try {
    const user = new User({ name, lastName, phone, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res
      .status(400)
      .json({ error: "User registration failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
