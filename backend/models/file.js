const mongoose = require("mongoose");
const FileDetailsScehma = new mongoose.Schema(
  {
   file:String
  },
  {
    collection: "FileDetails",
  }
);

mongoose.model("FileDetails", FileDetailsScehma);