const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const uploadRoutes = require("./routes/upload"); // Import your routes
const ipMiddle = require('./middlewares/ipMiddle')
const app = express();
const port = 1000;


const localIpAddress = ipMiddle;

// Use CORS middleware with specific origin
app.use(cors({
  origin: `http://${localIpAddress}:3000`, // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE'], // Specify allowed methods
  credentials: true // If your frontend needs to send cookies, you might need this
}));

app.use(express.json());
app.use("/api", uploadRoutes); // Use your upload routes under a common path

connectToMongo();

app.listen(port, () => {
  console.log(`FileUpload backend listening on port ${port}`);
});
