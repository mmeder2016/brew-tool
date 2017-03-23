var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Models
var Recipe = require("./models/recipe.js");
var Hop = require("./models/hop.js");
var Fermentable = require("./models/fermentable.js");

// Mongoose mpromise deprecated - use bluebird promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use body parser with our app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/brewRecipe");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

var fermentableArray = [
    { "name": "Pilsner (DE)", "lbs": "10", "ozs": "0" },
    { "name": "Vienna (DE)", "lbs": "2", "ozs": "0" },
    { "name": "Acidulated Malt (DE)", "lbs": "0", "ozs": "6" },
    { "name": "Aromatic (DE)", "lbs": "0", "ozs": "4" },
    { "name": "Biscuit (DE)", "lbs": "0", "ozs": "4" }
];
var hopArray = [
    { "name": "Hallertau (DE)", "lbs": "0", "ozs": "1", "alphaAcid": "4.1", "minutes": "60" },
    { "name": "Saaz (CZ)", "lbs": "0", "ozs": "1", "alphaAcid": "3.6", "minutes": "30" },
    { "name": "Tettnanger (DE)", "lbs": "0", "ozs": "1", "alphaAcid": "3.9", "minutes": "20" }
];

// Add a recipe
var recipe = new Recipe({
    "version": "1.0",
    "dateCreated": "12/31/2016",
    "dateLastEdit": "01/25/2017",
    "recipeName": "Belgian Blondie",
    "style": "Belgian Blonde Ale",
    "brewDate": "03/17/2017",
    "batchSize": "6.5",
    "mashingComments": "Single infusion mash 153 F for 1 hour ten minutes. Boil 60 minutes. 1.060 @74 F.",
    "hopComments": "None",
    "yeast": "Belgian Ardennes",
    "fermentationtTemperatureF": "68",
    "originalGravity": "1.060",
    "finalGravity": "1.007",
    "fermentingComment": "Single infusion mash at 152 deg F"
});

// Save the recipe
recipe.save(function(error, doc) {
    if (error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
 // Add the fermentables to the recipe
fermentableArray.forEach( function(element){
    addFermentable(recipe._id, element);
});
 // Add the hops to the recipe
hopArray.forEach( function(element){
    addHop(recipe._id, element);
});

// Add the fermentables to the recipe
// recipeId is the database ID of the recipe
// obj is the fermentable definition
function addFermentable(recipeId, obj) {
    var fermentable = new Fermentable(obj);
    fermentable.save(function(error, savedFermentable) {
        if (error) {
            console.log(error);
        } else {
            console.log(savedFermentable);
            fermentableId = savedFermentable._id;
            Recipe.findOneAndUpdate({ "_id": recipeId }, { $push: { "fermentables": savedFermentable._id } }, { new: true }, function(err, newdoc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(newdoc);
                }
            });
        }
    });
}

// Add the hops to the recipe
// recipeId is the database ID of the recipe
// obj is the hop definition
function addHop(recipeId, obj) {
    var hop = new Hop(obj);
    hop.save(function(error, savedHop) {
        if (error) {
            console.log(error);
        } else {
            console.log(savedHop);
            hopId = savedHop._id;
            Recipe.findOneAndUpdate({ "_id": recipeId }, { $push: { "hops": savedHop._id } }, { new: true }, function(err, newdoc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(newdoc);
                }
            });
        }
    });
}