// npm install
var WebSocket = require('ws');
//var log = require('npmlog');
var async = require('async');
var Primus = require('Primus');
var sockets = [];
var  request = require('request');
//---------------------------------------------------------------------------------------


var p = process.argv[2] || "http://next-fan.com";
var basePath = p;

var clientAmounts = process.argv[3] || 10;

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

console.log (" testClient.js > p = " , p, clientAmounts );


function TestClient () {
};

TestClient.prototype.start = function(){
    var self = this;
    request(basePath + '/auth', function (error, response, body) {
        var json = JSON.parse(body)
        var token = json.token;
        console.log (" testClient.js > token  = " , token );
        self.connectWs(token)
    });
};

TestClient.prototype.connectWs = function(t){
    var token = t;
    var Socket = Primus.createSocket({
            transformer: "websockets",
            parser: "json",
            plugin: {
                'primus-emit': require('primus-emit')
            }
        });

    var client = new Socket(basePath);

    client.on('outgoing::url', function connectionURL(url) {
        url.query = 'token=' + (token || '');
    });

    client.on('open', function open() {
        console.log (" PrimusFactory.js > OPEN = " );
    });

    client.on('ping', function (data) {
        console.log (" testClient.js > ping = " , data);
    });

};


/****************************************************************
 * START THE TEST
 */
function startTest() {
    var amount = [];
    amount.length = clientAmounts;
    
    console.log ("");
    console.log ("");
    console.log ("::: STARTING CLIENT AT: " + basePath + " WITH "+ amount.length  + " CONNECTIONS" );
    console.log ("-----------------------------------------------------------------------------");

    async.each(amount, function(file, callback) {
        var t = new TestClient()
        sockets.push(t);
        t.start();
        callback();
    }, function(err){
        console.log('TRYING TO CONNECT... \n');

    });

};


startTest();


