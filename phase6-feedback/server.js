const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Feedback = require("./models/Feedback");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully!"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save feedback."
    });
  }
});
app.get("/api/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get feedback."
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
  });
