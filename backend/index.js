const connectToMongo = require('./db');
const express = require('express')
const app = express();
connectToMongo();
const port = 8080;

// app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    // res.render('index');
});

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})