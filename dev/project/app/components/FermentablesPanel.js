// Include React
var React = require("react");
var Fermentable = require ("./Fermentable");

var FermentablesPanel = React.createClass({

    addFermentable: function (data) {
        console.log('FermentablesPanel addNewFermentable : function () {');
        this.props.addNewFermentable('Vienna Malt');
    },

    deleteFermentableCallback: function(id){
        console.log('deleteFermentableCallback: function(){');
        this.props.deleteFermentable(id);
    },

    render: function() {
        console.log('FermentablesPanel render: function () {');
        console.log(this.props.fermentables);

        var parent = this;

        var fermentablesMap = [];
        if(Array.isArray(this.props.fermentables)) {
            fermentablesMap = this.props.fermentables.map(function (fermentable) {
                return (<Fermentable key={fermentable._id} id={fermentable._id} name={fermentable.name} lbs={fermentable.lbs} ozs={fermentable.ozs} cb={parent.deleteFermentableCallback}/>)
            });
        }

        return ( 
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Fermentables</strong></h3>
                        </div>
                        <button onClick={this.addFermentable} className="add-fermentable" type="submit">Add New Fermentable</button>
                        <div className="panel-body" id="savedSection">
                            {fermentablesMap}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FermentablesPanel;