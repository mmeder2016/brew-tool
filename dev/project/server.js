//////////////////// EXPRESS SETUP ////////////////////
var express = require("express");
var app = express();
app.use(express.static("./public"));

//////////////////// BODY PARSER SETUP ////////////////////
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//////////////////// DATABASE MODELS MONGOOSE ////////////////////
var mongoose = require('mongoose');
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

// Models
var Recipe = require("./models/recipe.js");
var Hop = require("./models/hop.js");
var Fermentable = require("./models/fermentable.js");

mongoose.connect("mongodb://localhost/brewRecipe");
var db = mongoose.connection;
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//////////////////// SET PORT  ////////////////////
app.set('port', (process.env.PORT || 3000));

////////////////BREW API/////////////////////
var request = require('request');
var AUTHKEY = "9f195bca21d9eb8f1e20cfe7615e3744";
var BREWAPIURL = "http://api.brewerydb.com/v2/";
var queryUrl = BREWAPIURL;

var brewStyles = {};
var brewYeasts = {};
var brewHops = {};
var brewFermentables = {};

request(createURL('styles'), function(error, response, body) {
    if (!error && response.statusCode == 200) {
        brewStyles = JSON.parse(JSON.stringify(body));
    }
});
request(createURL('yeasts'), function(error, response, body) {
    if (!error && response.statusCode == 200) {
        brewYeasts = JSON.parse(JSON.stringify(body));
    }
});
request(createURL('hops'), function(error, response, body) {
    if (!error && response.statusCode == 200) {
        brewHops = JSON.parse(JSON.stringify(body));
    }
});
request(createURL('fermentables'), function(error, response, body) {
    if (!error && response.statusCode == 200) {
        brewFermentables = JSON.parse(JSON.stringify(body));
    }
});

function createURL(apiRequest) {
    var url = BREWAPIURL + apiRequest + "?key=" + AUTHKEY + "&format=json";
    return url;
}

//////////////////// START THE SERVER ////////////////////
app.listen(app.get('port'), function() {
    console.log("App running on port 3000!");
});

// Routes
app.get("/recipe", function(req, res) {
    console.log('app.get("/recipe", function(req, res) {');
    var id = req.body.id;
    // Remove later
    id = "58d81291d1a37d278caf0882";

    Recipe.findById(id)
        .populate("hops")
        .populate("fermentables")
        .exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});

app.post("/newHop", function(req, res) {
    console.log('app.post("/newHop", function(req, res) {');
    var hop = new Hop({ "name": req.body.name, "lbs": "0", "ozs": "0", "alphaAcid": "0", "minutes": "0" });
    hop.save(function(error, savedHop) {
        if (error) {
            console.log(error);
        } else {
            console.log(savedHop);
            hopId = savedHop._id;
            Recipe.findByIdAndUpdate({ "_id": req.body.id }, { $push: { "hops": savedHop._id } }, { new: true }, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    Recipe.findById(req.body.id)
                        .populate("hops")
                        .populate("fermentables")
                        .exec(function(error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                res.json(doc);
                            }
                        });
                }
            });
        }
    });
});

app.delete("/deleteHop", function(req, res) {
    console.log('app.delete("/deleteHop", function(req, res) {');
    // Update the Recipe removing the hop
    Recipe.findByIdAndUpdate(req.body.recipeId, { $pull: { 'hops': req.body.hopId } }, { new: true }, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            // Delete the hop from the hops database
            Hop.findByIdAndRemove(req.body.hopId, function(error, hopdoc) {
                if (error) {
                    console.log(error);
                    res.send(error);
                } else {
                    console.log("Deleted Hop:id:" + req.body.hopId);
                    Recipe.findById(req.body.recipeId)
                        .populate("hops")
                        .populate("fermentables")
                        .exec(function(error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(doc);
                                res.json(doc);
                            }
                        });
                }
            });
        }
    });
});

app.post("/newFermentable", function(req, res) {
    console.log('app.post("/newFermentable", function(req, res) {');
    var fermentable = new Fermentable({ "name": req.body.name, "lbs": "0", "ozs": "0" });
    fermentable.save(function(error, savedFermentable) {
        if (error) {
            console.log(error);
        } else {
            console.log(savedFermentable);
            fermentableId = savedFermentable._id;
            Recipe.findByIdAndUpdate({ "_id": req.body.id }, { $push: { "fermentables": savedFermentable._id } }, { new: true }, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    Recipe.findById(req.body.id)
                        .populate("hops")
                        .populate("fermentables")
                        .exec(function(error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                res.json(doc);
                            }
                        });
                }
            });
        }
    });
});

app.delete("/deleteFermentable", function(req, res) {
    console.log('app.delete("/deleteFermentable", function(req, res) {');
    // Update the Recipe removing the fermentable
    Recipe.findByIdAndUpdate(req.body.recipeId, { $pull: { 'fermentables': req.body.fermentableId } }, { new: true }, function(error, doc) {
        if (error) {
            console.log(error);
        } else {

            // Delete the fermentable from the fermentables database
            Fermentable.findByIdAndRemove(req.body.fermentableId, function(error, fermentabledoc) {
                if (error) {
                    console.log(error);
                    res.send(error);
                } else {
                    console.log("Deleted Fermentable:id:" + req.body.fermentableId);
                    Recipe.findById(req.body.recipeId)
                        .populate("hops")
                        .populate("fermentables")
                        .exec(function(error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                res.json(doc);
                            }
                        });
                }
            });
        }
    });
});

app.post("/updateRecipe", function(req, res) {
    console.log('app.post("/updateRecipe", function(req, res) {');
    var hopsPromises = req.body.recipe.hops.map(function(hmod) {
        return Hop.findByIdAndUpdate(hmod._id, { name: hmod.name, lbs: hmod.lbs, ozs: hmod.ozs, alphaAcid: hmod.alphaAcid, minutes: hmod.minutes }).exec();
    });
    var fermentablesPromises = req.body.recipe.fermentables.map(function(fmod) {
        return Fermentable.findByIdAndUpdate(fmod._id, { name: fmod.name, lbs: fmod.lbs, ozs: fmod.ozs }).exec();
    });
    var recipePromise = Recipe.findByIdAndUpdate(req.body.recipe._id, {
        version: req.body.recipe.version,
        dateCreated: req.body.recipe.dateCreated,
        dateLastEdit: req.body.recipe.dateLastEdit,
        recipeName: req.body.recipe.recipeName,
        style: req.body.recipe.style,
        brewDate: req.body.recipe.brewDate,
        batchSize: req.body.recipe.batchSize,
        mashingComments: req.body.recipe.mashingComments,
        hopComments: req.body.recipe.hopComments,
        yeast: req.body.recipe.yeast,
        originalGravity: req.body.recipe.originalGravity,
        finalGravity: req.body.recipe.finalGravity,
        fermentingComment: req.body.recipe.fermentingComment
    }).exec();
    // Avter promises complete, get a copy of the new recipe object and return it
    Promise.all([recipePromise].concat(hopsPromises, fermentablesPromises)).then(function() {
        console.log('All promises complete.');
        Recipe.findById(req.body.recipe._id)
            .populate("hops")
            .populate("fermentables")
            .exec(function(error, doc) {
                if (error) {
                    console.log(error);
                } else {
                    res.json(doc);
                }
            });
    });
});

app.get("/hoplist", function(req, res) {
    console.log('app.get("/hoplist", function(req, res) {');
    res.json(brewHops);
});

app.get("/fermentablelist", function(req, res) {
    console.log('app.get("/fermentablelist", function(req, res) {');
    res.json(brewFermentables);
});

app.post("/collections", function(req, res) {
    console.log();
    // console.log(brewCategory);
    // console.log(brewStyles);
    // console.log(brewYeasts);
    console.log(brewHops);
    // console.log(brewFermentables);
    res.send('Check server logging');
});
