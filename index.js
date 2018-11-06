// main starting point of application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB set-up

// mongoose.connect('mongodb://localhost:27018');
mongoose.connect('mongodb://localhost:27017/auth');

// mongoose.connect('mongodb://localhost/auth/auth');


//App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);



// Server Set-up

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server Listening on:', port);
