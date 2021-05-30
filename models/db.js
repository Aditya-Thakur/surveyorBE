const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aditya:vercel@surveydb.lkwaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
    if(!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB Connection : '+ err)}
});

require('./user.model');
require('./survey.model'); 
require('./response.model');