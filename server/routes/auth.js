/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 13-07-2015.
 */

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require ('../models/User');
var jwtSecret = require ('../config').jwtSecret;
var Faker = require('faker');

//The content of the facebook Me object is defind here:
//https://developers.facebook.com/docs/graph-api/reference/v2.2/user?locale=da_DK

var randomName = Faker.name.findName(); // Rowan Nikolaus
var randomEmail = Faker.internet.email(); // Kassandra.Haley@erich.biz

router.get('/', function (req, res) {

    var email = Faker.internet.email();
    User.findOne({email:email}, function (err, result) {

        if(result){
           sendToken(err, result, res)
        }else{

            var entry = new User({
                fbUserId:"" ,
                name:	Faker.name.findName(),
                email:	email,
                loggedIn:Date.now()
            });

            entry.save(function (err, result) {
               sendToken(err, result, res)

            })

        }
    });
});


function sendToken (err, result, res ) {

    if(err ){
        res.status('503').send('error in routes/auth.js  '+ err);
        return
    }

    var userObj = {
        "userId": result._id,
        "userName": result.name
    };

    var token = jwt.sign( userObj , jwtSecret, { expiresInMinutes: 60*5 });
    res.json ({"token": token, "user": userObj })

};


module.exports = router;
