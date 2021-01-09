const mongoose = require('mongoose');

var responseSchema = new mongoose.Schema({
    surveyId : {
        type: String
    },
    submittedOn : {
        type: Date
    },
    answer: {
        type: answerList
    }
}); 

var answerList = new mongoose.Schema({
    questionContent : {
        type: Date
    },
    userResponse : {
        type: String
    },
    optionList : {
        type: option
    }
    
}); 

var option = new mongoose.Schema({
    value : {
        type: String
    }
}); 

mongoose.model('Response', responseSchema); 