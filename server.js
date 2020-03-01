const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//sunny followed a tutorial and was driving while aaskar was navigating

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("MongoDB database  established successfully");
});connection


const blogpostsRouter = require('./routes/blogposts');
const subscriptionsRouter = require('./routes/subscriptions');
 
app.use('/blogposts', blogpostsRouter);
app.use('/subscriptions', subscriptionsRouter);

app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname+ '/frontend/www/index.html');
  });

app.listen(port, ()=> {
    console.log('Server is running on port: ${port}');
});
 
