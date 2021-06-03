const express = require('express');
const mongoose = require('mongoose');
const user = mongoose.model('User');
var router = express.Router();
const bcrypt = require('../utils/secure');
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
    bcrypt.cryptPassword(req.body.password, (err, hash) => {
        if(!err) {
            newUser.password = hash;
        } else {
            console.log(err);
        }
    })
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
            console.log('Error during adding user: ' + err);
        }
    });
}

function fetchUser(req, res) {
    console.log('login');
    console.log(req.body);
    user.findOne( { email: req.body.email}, function(err, docs) {
            if(!err){
            bcrypt.comparePassword(req.body.password, docs.password, (err, cmp) => {
                if(cmp) {
                    res.json(docs);
                } else {
                    console.log('Wrong Password: ' + err);
                    res.json({
                        errorMessage = "Wrong Password. Try again."
                    });
                }
            })
        } else {
                console.log('Error in retrieving user: ' + err);
                res.json({
                    errorMessage = "No user found. Try again."
                });
            }
        });
}
module.exports = router; 