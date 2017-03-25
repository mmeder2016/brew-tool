// Include React
var React = require("react");

var Fermentable = React.createClass({
    deleteFermentable: function (event) {
        console.log('Fermentable deleteFermentable: function (event) {');
        this.props.cb(this.props.id);
    },

    render: function() {
        console.log('Fermentable render: function () {');
        return (
            <div className="well">
                lbs:{this.props.lbs} ozs:{this.props.ozs} name:{this.props.name}
                <button data-id={this.props.id} onClick={this.deleteFermentable} className="delete-article" type="submit">Delete Fermentable</button>
            </div>
        );
    }
});

module.exports = Fermentable;