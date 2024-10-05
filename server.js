const mongoose = require('mongoose');
const dbConnect = require("./src/lib/dbConnect.js");
const express = require("express");
const rootRoute = require("./src/root_Route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Add this line near the top of the file, after requiring mongoose
mongoose.set('strictQuery', false);

dbConnect().catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ivana-event.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => res.send("API running..."));

rootRoute(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server running on PORT:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
