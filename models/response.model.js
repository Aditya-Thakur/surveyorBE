const mongoose = require('mongoose');

var responseSchema = new mongoose.Schema({
    surveyId : {
        type: String
    },
    submittedOn : {
        type: Date
    },
    answer: {
        type: [
{
    questionContent : {
        type: Date
    },
    userResponse : {
        type: String
    },
    optionList : {
        type: [
            {
                value : {
                    type: String
                }
            }
        ]
    }
}
        ]
    }
}); 

mongoose.model('Response', responseSchema); 