require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const APIRoutes = require('./api/routes');

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());
app.use(APIRoutes);




//-------- DB -----------------

const mongoose = require('mongoose');
database = 'mongodb://localhost:27017/redisTPDB';
mongoose.connect(database,(err)=>{
    if(err)
        throw err;
    console.log('conneced to the database')
});


app.listen(3000);
console.log("waiting on localhost:3000");