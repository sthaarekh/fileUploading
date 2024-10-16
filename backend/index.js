const express = require("express");
const multer = require("multer");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const port= 1000;

app.listen(port, () => {
  console.log(`FileUpload backend listening on port ${port}`)
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+ file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post("/upload-image",upload.single("image"),async (req, res) => {
console.log(req.body);
res.send("Uploaded");
})