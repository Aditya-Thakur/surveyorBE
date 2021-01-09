const mongoose = require('mongoose');

var surveySchema = new mongoose.Schema({
    createdBy : {
        type: String
    },
    createdOn : {
        type: Date
    },
    validTill : {
        type: Date
    },
    active : {
        type: Boolean
    },
    question: {
        type: questionList
    }
}); 

var questionList = new mongoose.Schema({
    questionType : {
        type: String
    },
    questionContent : {
        type: Date
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

mongoose.model('Survey', surveySchema); 