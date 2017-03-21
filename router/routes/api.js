/* ************************************************************************ */
/*
    Server API Routing -


    NOTE: The module arguments are required. And your code will use them to 
    access the Express application object, database object, and the root path 
    of the application.

    
*/
module.exports = function(app) {

    var path = require('path');

    /*
        POST /api/signup - 
    */
    app.post('/api/signup', function(req, res) {
        console.log('post - /api/signup');
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/signup</h3></body></html>');
    });

    /*
        POST /api/login - 
    */
    app.post('/api/login', function(req, res) {
        console.log('post - /api/login');
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/login</h3></body></html>');
    });

    /*
        POST /api/register - 
    */
    app.post('/api/register', function(req, res) {
        console.log('post - /api/register');
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/register</h3></body></html>');
    });

    /*
        POST /api/confirm - 
    */
    app.post('/api/confirm', function(req, res) {
        console.log('post - /api/confirm');
        if(res !== undefined) res.end();
        res.send('<html lang="en"><head><title>HELLO WORLD - Test</title></head><body><h3>got POST /api/confirm</h3></body></html>');
    });
};
