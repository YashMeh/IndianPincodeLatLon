const dotenv=require("dotenv");
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const port=process.env.PORT || 3000
var url=process.env.URI;
var entries;
MongoClient.connect(url,function(err,db){
    if(err)
    throw err;
    entries=db.db("indianpin");
    console.log("DB Connected");
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get("/api/:pin",function(req,res){
    const pin=Number(req.params.pin);
    entries.collection("entry").findOne({'pin':pin},function(err,resp){
        res.json(resp);
    })
})
app.listen(port,function(err){
    if(err)
    throw err;
    else
    console.log("App running on port "+port);
})
