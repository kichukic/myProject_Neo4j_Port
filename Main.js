const express = require("express");
``
const env = require("dotenv").config();
const logger = require("morgan");
const session = require("./API/authentication")
const path = require("path");
const mongodb = require("./connection/database")
const app = express()
const stableroute =require('./API/authentication');
const { mongo } = require("mongoose");
const pagepath = path.join(__dirname,"views");


//env values
const port  = process.env.PORT


app.use("/",stableroute)
app.use("mongo",mongodb)
app.use(logger("tiny")) 
app.use(express.static(pagepath))



app.set("view engine","hbs")







app.listen(port,((err,data)=>{
    if(err){
        console.log("error occure",err)
    }
    console.log(`successfully connected to servers on port ${port}`)
}))
