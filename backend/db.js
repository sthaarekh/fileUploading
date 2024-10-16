const mongoose = require("mongoose");
const mongoUrl ="mongodb://localhost:27017/fileUpload";

const connectToMongo=async()=>{
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  }).then(() => {
    console.log("Connected to database");
  }).catch((e) => console.log(e));
}

module.exports = connectToMongo;