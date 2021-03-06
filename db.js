var mongoose = require('mongoose');

// connection uri
var dbURI = 'mongodb://localhost/join';

// exports connect function to app.js
exports.connect = function(){

    // get the database connection pool
    mongoose.connect(dbURI);

    // DB Connection Events
    // Succeed to connect database
    mongoose.connection.on('connected', function(){
        console.log('Succeed to get connection pool in mongoose, dbURI is '+ dbURI);
    });

    // Failed to connect database
    mongoose.connection.on('error', function(err){
        console.log('Failed to get connetion in mongoose, err is' + err);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Database connection has disconnected.');
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Application process is going down, disconnect database connection...');
            process.exit(0);
        });
    });
};