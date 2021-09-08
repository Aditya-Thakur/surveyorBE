const mongoose = require('mongoose');

var responseSchema = new mongoose.Schema({
    userIP : {
        type: String
    },
    surveyId : {
        type: String
    },
    submittedOn : {
        type: Date
    },
    answer: {
        type: [
{
    questionId : {
        type: String
    },
    questionType : {
        type: String
    },
    userResponse : {
        type: String
    },
    optionList : {
        type: [String]
    }
}
        ]
    }
}); 

mongoose.model('Response', responseSchema); 