const express = require ('express')
const mongoose = require ('mongoose');
const route = require('./route/route.js')
const multer = require("multer")

const app = express()
app.use(multer().any())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://namankumarjha04:Pn5RdVcvQz8iYCet@cluster0.jhtygs6.mongodb.net/test", {
    useNewUrlParser: true
})
.then(()=> console.log("MongoDB is connected"))
.catch(err => console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
  });