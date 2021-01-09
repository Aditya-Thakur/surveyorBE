const express = require('express');
const mongoose = require('mongoose');
const survey = mongoose.model('Survey');
var router = express.Router();

router.post('/fetchMySurveys', (req,res) => {
    survey.findOne( { createdBy: req.body.createdBy }, function(err, docs) {
        if(!err) {
            res.json(docs);
        } else {
            console.log('Error in fetching surveys: ' + err);
        }
    }); 
});

router.post('/changeStatus', (req,res) => {
    survey.findOne({ id : req.body.id }, function(err, docs) {
        if(!err){
        docs.active = req.body.active;
        docs.save(function(err) {
            if(!err){
                var response = {
                    status: 100,
                    message: "Survey status changed successfully."
                }
                res.json(response); 
            }else {
            console.log('Error in updating survey status: ' + err);
            var response = {
                status: 201,
                message: "Error in updating survey status right now. Please contact administrator."
            }
            res.json(response); 
        }
        });
        
    } else {
            console.log('Error in retrieving survey: ' + err);
            var response = {
                status: 202,
                message: "Looks like this survey doesn't exist anymore. Please contact administrator."
            }
            res.json(response); 
        }
    });
});

router.post('/createSurvey', (req,res) => {
    addSurvey(req,res);
});

function addSurvey(req,res) {
    var newSurvey = new survey(); 
    newSurvey.createdBy = req.body.createdBy;
    newSurvey.createdOn = req.body.createdOn;
    newSurvey.validTill = req.body.validTill;
    newSurvey.active = req.body.active;
    newSurvey.question = req.body.question;
    newSurvey.save((err, docs) => {
        if(!err){
            var response = {
                status: 100,
                message: "Survey Created",
                surveyCode: docs.id
            }
            res.json(response);
        } else {
            console.log('Error during Survey record insertion: ' + err);
        }
    });
}

router.get('/getSurvey:surveyId', (req,res) => {
    survey.findOne( {id: req.params.surveyId}, function (err, docs) {
        if(!err) {
            if( (docs.validTill > new Date()) && (docs.active)) {
                res.json(docs);
            } else {
                var response = {
                    status: 202,
                    message: "Either survey link is expired or inactive."
                }
                res.json(response);
            }
        } else {
            console.log("Error found in fetching survey: " + err);
            var response = {
                status: 201,
                message: "Could not find your survey"
            }
            res.json(response);
        }
    });
});
module.exports = router; 