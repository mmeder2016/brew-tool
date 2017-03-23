var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recipeSchema = {
    version: {
        type: String
    },
    dateCreated: {
        type: String
    },
    dateLastEdit: {
        type: String
    },
    recipeName: {
        type: String
    },
    style: {
        type: String
    },
    brewDate: {
        type: String
    },
    batchSize: {
        type: String
    },
    fermentables: [{
        type: Schema.Types.ObjectId,
        ref: "Fermentable"
    }],
    mashingComments: {
        type: String
    },
    hops: [{
        type: Schema.Types.ObjectId,
        ref: "Hop"
    }],
    hopComments: {
        type: String
    },
    yeast: {
        type: String
    },
    fermentationTemperatureF: {
        type: String
    },
    originalGravity: {
        type: String
    },
    finalGravity: {
        type: String
    },
    fermentingComment: {
        type: String
    }
};

module.exports = mongoose.model("Recipe", new Schema(recipeSchema));