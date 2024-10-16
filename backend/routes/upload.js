const express = require('express');
const mongoose = require("mongoose");
const upload = require('../middlewares/middleware'); // Import the upload middleware

const router = express.Router();
require("../models/image"); // Assuming the model is in the models directory
const Images = mongoose.model("ImageDetails");

// POST route for uploading an image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  try {
    // Save image filename to the database
    await Images.create({ image: imageName });
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get("/get-image",async(req,res)=>{
    try {
        const data = await Images.find({}); // Use async/await consistently
        res.json({ status: 'ok', data: data });
      } catch (error) {
        console.error("Error fetching images:", error); // Log the error
        res.status(500).json({ status: 'error', message: error.message });
      }
})

module.exports = router;
