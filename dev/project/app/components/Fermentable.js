// Include React
var React = require("react");

var Fermentable = React.createClass({
    deleteFermentable: function (event) {
        console.log('Fermentable deleteFermentable: function (event) {');
        this.props.cb(this.props.id);
    },
    handleChange: function(event) {
        console.log('handleChange: function(event) {');
        this.props.fermentableChange(this.props.id, event.target.id, event.target.value);
    },

    render: function() {
        console.log('Fermentable render: function () {');
        return (
            <div className="well">
                <label>Name:{this.props.name} </label>
                <label htmlFor="lbs">lbs:</label>
                <input type="text" className="form-control" className="numberBox" id="lbs" data-id={this.props.id} value={this.props.lbs} onChange={this.handleChange} size='4'/>
                <label htmlFor="ozs">ozs:</label>
                <input type="text" className="form-control" className="numberBox" id="ozs" data-id={this.props.id} value={this.props.ozs} onChange={this.handleChange} size='4'/>
                <button data-id={this.props.id} onClick={this.deleteHop} className="delete-article" type="submit">Delete Fermentable</button>
            </div>
        );
    }
});

module.exports = Fermentable;