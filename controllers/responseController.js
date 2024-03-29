const express = require('express');
const mongoose = require('mongoose');
const response = mongoose.model('Response');
var router = express.Router();


router.get('/fetchResponses:surveyId', (req,res) => {
    console.log(req.params.surveyId);
    response.find( { surveyId: req.params.surveyId }, function(err, docs) {
        if(!err) {
            res.json(docs);
        } else {
            console.log('Error in fetching survey responses: ' + err);
        }
    }); 
});

router.post('/addResponse', (req,res) => {
    addResponse(req,res);
});

function addResponse(req,res) {
    console.log(req.body);
    var newResponse = new response(); 
    newResponse.userIP = req.body.userIP;
    newResponse.surveyId = req.body.surveyId;
    newResponse.submittedOn = req.body.submittedOn;
    newResponse.answer = req.body.answer;
    newResponse.save((err, docs) => {
        if(!err){
            var response = {
                status: 100,
                message: "Response captured",
                userAnswers: docs
            }
            res.json(response);
        } else {
            console.log('Error during Survey response insertion: ' + err);
        }
    });
}
module.exports = router; 