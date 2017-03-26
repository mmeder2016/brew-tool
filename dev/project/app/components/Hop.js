// Include React
var React = require("react");

var Hop = React.createClass({

    deleteHop: function (event) {
        console.log('Hop deleteHop: function (event) {');
        this.props.cb(this.props.id);
    },

    handleChange: function(event) {
        console.log('handleChange: function(event) {');
        this.props.hopChange(this.props.id, event.target.id, event.target.value);
    },

    render: function() {
        console.log('Hop render: function () {');
        return (
            <div className="well">
                <form role="form">
                    <div className="form-group">
                        <label>Name:{this.props.name} </label>
                        <label htmlFor="lbs">lbs:</label>
                        <input type="text" className="form-control" className="numberBox" id="lbs" value={this.props.lbs} onChange={this.handleChange} size='4'/>
                        <label htmlFor="ozs">ozs:</label>
                        <input type="text" className="form-control" className="numberBox" id="ozs" value={this.props.ozs} onChange={this.handleChange} size='4'/>
                        <label htmlFor="minutes">minutes:</label>
                        <input type="text" className="form-control" className="numberBox" id="minutes"  value={this.props.minutes} onChange={this.handleChange} size='4'/>
                        <button data-id={this.props.id} onClick={this.deleteHop} className="delete-article" type="submit">Delete Hop</button>
                    </div>
                </form>

            </div>
        );
    }
});

module.exports = Hop;