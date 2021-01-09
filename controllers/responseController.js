const express = require('express');
const mongoose = require('mongoose');
const response = mongoose.model('Response');
var router = express.Router();


router.post('/fetchMyResponses', (req,res) => {
    response.find( { surveyId: req.body.surveyId }, function(err, docs) {
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
    var newResponse = new response(); 
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