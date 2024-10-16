const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db"); // Assuming you have a file for MongoDB connection
const uploadRoutes = require("./routes/upload"); // Import your upload routes

const app = express();
app.use(cors());
app.use(express.json());

const port = 1000;

// Connect to MongoDB
connectToMongo();

// Use the upload routes
app.use("/api", uploadRoutes);

app.listen(port, () => {
  console.log(`FileUpload backend listening on port ${port}`);
});
