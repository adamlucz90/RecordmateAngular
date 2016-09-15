var mongoose = require('mongoose');
var shutdown;
var db = 'mongodb://localhost:27017/recordmate';
if (process.env.NODE_ENV === 'production') {
  db = process.env.MONGOLAB_URI;
}

mongoose.connect(db);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
shutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  shutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  shutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// Bring in schema
require('./schema');