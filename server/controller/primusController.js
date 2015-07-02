/**
 * Created by Fantastisk on 24-06-2015.
 */

var Primus = require('primus');
var primusEmitPlugin = require('primus-emit');
var path = require('path');

var primus = null;

exports.init = function (server) {

    var module = this;

    primus = new Primus(server ,{
        parser: 'JSON'
    });

    primus.use('emit', primusEmitPlugin);

    var p = path.join(__dirname, '../../public/myPrimus.js')
    primus.save(p , function save(err) {

    });

    primus.on('connection', function (sp) {
        var spark = sp;

        spark.on('custom-event', function custom(data) {
            var d = Date.now()
            var obj = {"ping": "pong " + d};
            this.emit('ping', obj);
        });

    });// close connection

};