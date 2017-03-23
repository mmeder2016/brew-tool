var express = require("express");
var express = require("express");
var request = require('request');
var fs = require('fs');
var bodyParser = require("body-parser");

// Initialize Express
var app = express();

// Use body parser with our app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

var apiGET = ['styles', 'hops', 'fermentables', 'yeasts'];

var AUTHKEY = "9f195bca21d9eb8f1e20cfe7615e3744";
var BREWAPIURL = "http://api.brewerydb.com/v2/";
var queryUrl = BREWAPIURL;

apiGET.forEach(function(element) {
    console.log('apiGET:' + element);
    callAPI(createURL(element), element);
});

function createURL(apiRequest) {
    var url = BREWAPIURL + apiRequest + "?key=" + AUTHKEY + "&format=json";
    console.log('createURL:' + url);
    return url;
}

function callAPI(url, apiRequest) {
    console.log('callAPI:' + url);
    request(url, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {
            console.log("Response: " + body);
            var filename = apiRequest + '.json';

            var jsonStr = JSON.stringify(JSON.parse(body), null, 2);
            fs.writeFile(filename, jsonStr, function(err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Successfully wrote file:" + filename);
                }
            });

        }
    });
}