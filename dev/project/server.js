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

//////////////////// START THE SERVER ////////////////////
app.listen(app.get('port'), function() {
    console.log("App running on port 3000!");
});

app.get("/recipe", function(req, res) {
    console.log('app.get("/recipe", function(req, res) {');
    var id = req.body.id;
    // Remove later
    id = "58d59dd4a69f5c1ff0bb49d7";

    Recipe.findById(id)
        .populate("hops")
        .populate("fermentables")
        .exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                // var jsonStr = JSON.stringify(doc);
                // console.log(jsonStr);
                // res.send(jsonStr);
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
    // Update the Recipe
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
    // Update the Recipe
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
    console.log(req.body.recipe);

    var recipe = new Recipe(req.body.recipe);
    // Get a copy of hops and fermentables so we can add them to their database
    // tables individually and then to the recipe object
    var hopsArray = req.body.recipe.hops;
    var fermentablesArray = req.body.recipe.fermentables;
    recipe.dateLastEdit = new Date().toLocaleDateString();

    Recipe.findByIdAndUpdate(recipe._id, recipe, { new: true }, function(error, model) {
        console.log('Recipe.findByIdAndUpdate(recipe._id, recipe, { new: true }, function(error, model) {');
        if (error) {
            console.log(error);
        } else {
            console.log('  Updated Recipe');
            // UPDATE FERMENTABLES
            fermentablesArray.forEach(function(element) {
                var fermentable = new Fermentable(element);
                Fermentable.findByIdAndUpdate(fermentable._id, fermentable, { new: true }, function(error, model) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('  Updated Fermentable');
                    }
                });
            });
            // UPDATE HOPS
            hopsArray.forEach(function(element) {
                var hop = new Hop(element);
                Hop.findByIdAndUpdate(hop._id, hop, { new: true }, function(error, model) {
                    if (error) {
                        console.log(error);
                        return error;
                    } else {
                        console.log('  Updated Hop');
                    }
                });
            });
        }
    });

    // This is incorrect. It needs to be in a promise
    Recipe.findById(recipe._id)
        .populate("hops")
        .populate("fermentables")
        .exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                console.log('RETURNING:' + doc)
                res.json(doc);
            }
        });
});