require('./models/db');
var cors = require('cors')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const userController = require('./controllers/userController'); 
const surveyController = require('./controllers/surveyController'); 
const responseController = require('./controllers/responseController'); 
var app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Express server started at port: 3000');
});
app.use(cors());
app.use( function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://surveyor-ui.vercel.app/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.use('/user', userController); 
app.use('/survey', surveyController);
app.use('/response', responseController); 
app.get('/', (req, res) => res.send('Home Page Route'));