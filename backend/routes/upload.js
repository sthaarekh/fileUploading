const express = require('express');
const mongoose = require("mongoose");
const upload = require('../middlewares/middleware'); // Import the upload middleware

const router = express.Router();
require("../models/file"); // Assuming the model is in the models directory
const Files = mongoose.model("FileDetails");

// POST route for uploading an file
router.post("/upload", upload.single("file"), async (req, res) => {
  const fileName = req.file.filename;
  try {
    // Save file filename to the database
    await Files.create({ file: fileName });
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

//Get Method 
router.get("/get",async(req,res)=>{
    try {
        const data = await Files.find({}); 
        res.json({ status: 'ok', data: data });
      } catch (error) {
        console.error("Error fetching files:", error); 
        res.status(500).json({ status: 'error', message: error.message });
      }
})

//delete method
router.delete("/delete/:id",async(req,res)=>{
    try {
        let data = await Files.findById(req.params.id);
        if (!data) { return res.status(404).send("Not Found") }
        data = await Files.findByIdAndDelete(req.params.id);
        res.json("Success file has been deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;
