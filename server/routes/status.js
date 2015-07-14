/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 14-07-2015.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendStatus(200)
});


module.exports = router;


