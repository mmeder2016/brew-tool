// Include React
var React = require("react");

var HopsPanel = require("../components/HopsPanel");
var FermentablesPanel = require("../components/FermentablesPanel");
var CalculationsPanel = require("../components/CalculationsPanel");
//var Hops = require("../components/Hops");
//var Feremntables = require("../components/Feremntables");
var helper = require("./utils/helpers");

var Main = React.createClass({
    getInitialState: function() {
        console.log('Main getInitialState: function () {');
        return {
            recipe: {}
        };
    },

    // data is the hop info to update recipe with 
    addNewHop: function(data) {
        console.log('Main addNewHop : function () {');
        helper.addHop(data, this.state.recipe._id).then(function(response) {
            //console.log(response);
            this.setState({
                recipe: response.data
            });
        }.bind(this));
    },

    deleteHop: function(hopId) {
        console.log('Main deleteHop : function () {');
        helper.deleteHop(hopId, this.state.recipe._id).then(function(response) {
            //console.log(response);
            this.setState({
                recipe: response.data
            });
        }.bind(this));
    },

    // data is the hop info to update recipe with 
    addNewFermentable: function(data) {
        console.log('Main addNewFermentable : function () {');
        helper.addFermentable(data, this.state.recipe._id).then(function(response) {
            //console.log(response);
            this.setState({
                recipe: response.data
            });
        }.bind(this));
    },

    deleteFermentable: function(fermentableId) {
        console.log('Main deleteFermentable : function () {');
        helper.deleteFermentable(fermentableId, this.state.recipe._id).then(function(response) {
            //console.log(response);
            this.setState({
                recipe: response.data
            });
        }.bind(this));
    },

    getRecipe: function(id) {
        console.log('Main getRecipe : function () {');
        helper.getRecipe(id).then(function(response) {
            //console.log(response);
            this.setState({
                recipe: response.data
            });
        }.bind(this));
    },
    testUpdateRecipe: function() {
        console.log('Main testUpdateRecipe : function () {');
        helper.updateRecipe(this.state.recipe).then(function(response) {
            //console.log(response);
            this.setState({
                recipe: response.data
            });
        }.bind(this));
    },

    calculationChange: function(tid, val) {
        console.log('Main calculationChange : function () {');
        console.log('tid:' + tid + ' val:' + val);

        if(tid === 'recipeName'){
            this.state.recipe.recipeName = val;
        } else if(tid === 'brewDate'){
            this.state.recipe.brewDate = val;
        } else if(tid === 'batchSize'){
            this.state.recipe.batchSize = val;
            // only the batchsize can change the calculations
            this.forceUpdate();
        } else if(tid === 'style'){
            this.state.recipe.style = val;
        }

    },

    fermentableChange: function(pid, tid, val) {
        console.log('Main fermentableChange : function () {');
        for(var i = 0; i < this.state.recipe.fermentables.length; i++) {
            console.log('inloop:' + this.state.recipe.fermentables[i]._id)
            if(this.state.recipe.fermentables[i]._id === pid){
                if(tid === 'ozs'){
                    this.state.recipe.fermentables[i].ozs = val;
                } else if(tid === 'lbs'){
                    this.state.recipe.fermentables[i].lbs = val;
                } 
                break;
            }
        }
        this.forceUpdate();
    },

    hopChange: function(pid, tid, val) {
        console.log('Main hopChange : function () {');
        for(var i = 0; i < this.state.recipe.hops.length; i++) {
            console.log('inloop:' + this.state.recipe.hops[i]._id)
            if(this.state.recipe.hops[i]._id === pid){
                if(tid === 'ozs'){
                    this.state.recipe.hops[i].ozs = val;
                } else if(tid === 'lbs'){
                    this.state.recipe.hops[i].lbs = val;
                } else if(tid === 'minutes'){
                    this.state.recipe.hops[i].minutes = val;
                }
                break;
            }
        }
        this.forceUpdate();
    },

    render: function() {
        console.log('Main render: function () {');

        return ( 
            <div className = "container-fluid" >
                <div className = "row" >
                    <div>
                        <h1 className = "text-center" > Brew App </h1> 
                        <br/>
                        <div className = "text-center" >
                        </div> 
                    </div> 
                </div> 
                <hr/>
                <button onClick = {this.getRecipe} className="btn btn-default" type="submit"> GetRecipe </button>
                <button onClick = {this.testUpdateRecipe} className="btn btn-default" type="submit"> TestUpdateRecipe </button> 
                <CalculationsPanel recipe = {this.state.recipe} calculationChange={this.calculationChange}/> 
                <HopsPanel hopChange={this.hopChange} addNewHop={this.addNewHop} deleteHop={this.deleteHop} hops={this.state.recipe.hops}/> 
                <FermentablesPanel fermentableChange={this.fermentableChange} addNewFermentable={this.addNewFermentable} deleteFermentable={this.deleteFermentable} fermentables={this.state.recipe.fermentables}/> 
            </div>
        );
    },
});

module.exports = Main;