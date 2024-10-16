const express = require('express');
const mongoose = require("mongoose");
const upload = require('../middlewares/middleware'); // Import the upload middleware

const router = express.Router();
require("../models/image"); // Assuming the model is in the models directory
const Images = mongoose.model("ImageDetails");

// POST route for uploading an image
router.post("/upload", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  try {
    // Save image filename to the database
    await Images.create({ image: imageName });
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

//Get Method 
router.get("/get",async(req,res)=>{
    try {
        const data = await Images.find({}); // Use async/await consistently
        res.json({ status: 'ok', data: data });
      } catch (error) {
        console.error("Error fetching images:", error); // Log the error
        res.status(500).json({ status: 'error', message: error.message });
      }
})

//delete method
router.delete("/delete/:id",async(req,res)=>{
    try {
        let data = await Images.findById(req.params.id);
        if (!data) { return res.status(404).send("Not Found") }
        data = await Images.findByIdAndDelete(req.params.id);
        res.json("Success transaction has been deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;
