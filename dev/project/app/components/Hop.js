// Include React
var React = require("react");

var Hop = React.createClass({
    deleteHop: function (event) {
        console.log('Hop deleteHop: function (event) {');
        this.props.cb(this.props.id);
    },

    render: function() {
        console.log('Hop render: function () {');
        return (
            <div className="well">
                lbs:{this.props.lbs} ozs:{this.props.ozs} name:{this.props.name} minutes:{this.props.minutes}
                <button data-id={this.props.id} onClick={this.deleteHop} className="delete-article" type="submit">Delete Hop</button>
            </div>
        );
    }
});

module.exports = Hop;