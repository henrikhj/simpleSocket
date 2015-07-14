/**
 * Created by @author @ddennis - ddennis.dk aka fantastisk.dk/works aka meresukker.dk on 14-07-2015.
 */
var pm2 = require('pm2');

pm2.connect(function() {
    pm2.start({
        script    : 'server/www',         // Script to be run
        name: 'myApp',
        exec_mode : 'fork',        // Allow your app to be clustered
        "env": {
            "NODE_ENV": "production",
            "MONGO_URI": "xxx"
        }
        /*instances : 4,                // Optional: Scale your app by 4*/
        /*max_memory_restart : '100M'   // Optional: Restart your app if it reaches 100Mo*/
    }, function(err, apps) {
        pm2.disconnect();
    });
});