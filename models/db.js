const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    if(!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB Connection : '+ err)}
});

require('./user.model');
require('./survey.model'); 
require('./response.model');