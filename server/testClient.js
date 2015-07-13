// npm install
var WebSocket = require('ws');
//var log = require('npmlog');
var async = require('async');
var Primus = require('Primus');
var sockets = [];
var  request = require('request');
//---------------------------------------------------------------------------------------


var basePath = "http://localhost:3000";

function TestClient () {
};

TestClient.prototype.start = function(){
    var self = this;
    request(basePath + '/auth', function (error, response, body) {
        var json = JSON.parse(body)
        var token = json.token;
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

    var client = new Socket('http://localhost:3000/primus');

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
    amount.length = 500;

    console.log ("::: STARTING CLIENT WITH "+amount.length  + " CONNECTIONS" );

    async.each(amount, function(file, callback) {
        var t = new TestClient()
        sockets.push(t);
        t.start();
        callback();
    }, function(err){
        console.log('TRYING TO CONNECT...');
    });

};


startTest();




//log.level = 'verbose';
/*
var sockets = [];
var maxSockets = 415; // max 400
var connectionAttempts = 0;

function connectToWebSocket() {
    connectionAttempts++;

    var socket = {};

    var ws;

    (function() {
        ws = new WebSocket('http://localhost:3000/primus');
    })();

    ws.on('open', function() {
        //log.info('Connected');
        console.log (" testClient.js > Connected = " );
    });

    ws.on('error', function() {
        //log.error('Error');
        console.log (" testClient.js > Error = " );
    });

    ws.on('close', function() {

        console.log (" testClient.js > CLOSED = ");
    });

    sockets.push(ws);

    if (connectionAttempts < maxSockets) {
        setTimeout(connectToWebSocket, 500);
    }

};*/

//connectToWebSocket();