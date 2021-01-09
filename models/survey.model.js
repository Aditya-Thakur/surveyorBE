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
        type: [
            {
                questionType : {
                    type: String
                },
                questionContent : {
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

mongoose.model('Survey', surveySchema); 