const express = require('express');
const mongoose = require('mongoose');
const user = mongoose.model('User');
var router = express.Router();
router.get('/', (req, res) => {
    res.json('just checking user')
});

router.post('/checkEmail', (req,res) => {
    user.findOne( { email: req.body.email }, function(err, docs) {
        if(!err) {
            var response = {
                message : "Email already exists"
            }
            res.json(response);
        } else {
            console.log('Error in checking email: ' + err);
        }
    }); 
    
});


router.post('/register', (req, res) => {
    insertUser(req, res);
});

router.post('/login', (req, res) => {
    fetchUser(req, res);
});
function insertUser(req, res){
    var newUser = new user(); 
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.gender = req.body.gender;
    newUser.dob = req.body.dob;
    newUser.mobileNumber = req.body.mobileNumber;
    newUser.save((err, doc) => {
        if(!err){
            var response = {
                status: 100,
                message: "Registered successfully."
            }
            res.json(response);
        } else {
            console.log('Error during ECC record insertion: ' + err);
        }
    });
}

function fetchUser(req, res) {
    user.findOne( { email: req.body.email, password: req.body.password }, function(err, docs) {
            if(!err){
            res.json(docs);
        } else {
                console.log('Error in retrieving user: ' + err);
            }
        });
}
module.exports = router; 