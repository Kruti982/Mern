// db.js
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://kruti:kruti123@cluster0.ymmc0el.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your URI
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("myDatabase"); // Use your DB name
    return db;
  } catch (error) {
    console.error("Connection failed", error);
  }
}

module.exports = connectDB;
