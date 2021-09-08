const mongoose = require('mongoose');

var surveySchema = new mongoose.Schema({
    createdBy : {
        type: String
    },
    createdOn : {
        type: Date
    },
    modifiedOn : {
        type: Date
    },
    validTill : {
        type: Date
    },
    active : {
        type: Boolean
    },
    surveyName : {
        type : String
    },
    surveyDescription : {
        type : String
    },
    question: {
        type: [
            {
                questionType : {
                    type: String
                },
                questionContent : {
                    type: String
                },
                optionList : {
                    type: [String]
                }
            }
        ]
    }
}); 

mongoose.model('Survey', surveySchema); 