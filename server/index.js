const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// Mongoose setup
mongoose.connect(
  `mongodb+srv://admin_mahatab:admin_mahatab_1014@cluster0.thttfqw.mongodb.net/Topics_DB`
);

// Define Topic schema and model
const topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API routes
app.post("/api/topics", async (req, res) => {
  try {
    const { title, description } = req.body;

    await Topic.create({ title, description });

    res.status(201).json({ message: "Topic created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid JSON format in the request body" });
  }
});

app.get("/api/topics", async (req, res) => {
  const topics = await Topic.find();
  res.status(200).json({ topics });
});

app.get("/api/topics/:id", async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const topic = await Topic.findOne(filter);
  res.send(topic);
});

app.delete("/api/topics/:id", async (req, res) => {
  const id = req.params.id;
  await Topic.findByIdAndDelete(id);
  res.status(200).json({ message: "Topic deleted successfully" });
});

app.put("/api/topics/:id", async (req, res) => {
  const id = req.params.id;
  const { newTitle: title, newDescription: description } = req.body;

  const filter = { _id: id };
  const update = { title, description };
  const options = { new: true };

  const updatedData = await Topic.findOneAndUpdate(filter, update, options);

  res.status(200).json({ message: "Topic updated successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
