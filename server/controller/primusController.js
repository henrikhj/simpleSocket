/**
 * Created by Fantastisk on 24-06-2015.
 */

var Primus = require('primus');
var primusEmitPlugin = require('primus-emit');
var path = require('path');
var primus = null;
var connetedClients = 0;

var jwt = require('jsonwebtoken');
var jwtSecret = require ('../config').jwtSecret;


exports.init = function (server) {

    var module = this;

    primus = new Primus(server ,{
        parser: 'JSON'
    });

    primus.use('emit', primusEmitPlugin);

    var p = path.join(__dirname, '../../public/myPrimus.js');
    primus.save(p , function save(err) {

    });


   primus.authorize(function (req, done) {

        var token = req.query.token;
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if(err ){
                console.log (" authorize.js > err " , err)
                done(err);
            }else{
                req.decoded_token = decoded;
                done();
            }
        })
    });



    primus.on('connection', function (sp) {
        var spark = sp;

        connetedClients++
        console.log (" primusController.js > USER CONNECTED = ", connetedClients);

        spark.on('custom-event', function custom(data) {
            var d = Date.now()
            var obj = {"ping": "pong " + d};
            this.emit('ping', obj);
        });

    });// close connection


    //disconnection
    primus.on('disconnection', function (sp) {
        connetedClients--;
        console.log (" primusController.js >  = USER CONNECTED  " , connetedClients);
    });// close connection



};

