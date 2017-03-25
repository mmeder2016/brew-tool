// Include React
var React = require("react");
var Hop = require ("./Hop");

var HopsPanel = React.createClass({

    addHop: function (data) {
        console.log('HopsPanel addNewHop : function () {');
        this.props.addNewHop('Tettnanger');
    },

    deleteHopCallback: function(id){
        console.log('deleteHopCallback: function(){');
        this.props.deleteHop(id);
    },

    render: function() {
        console.log('HopsPanel render: function () {');
        console.log(this.props.hops);
        console.log('typeof this.props.hops:' + typeof this.props.hops);
        console.log('isArray(this.props.hops):' + Array.isArray(this.props.hops));

        var parent = this;

        var hopsMap = [];
        if(Array.isArray(this.props.hops)) {
            hopsMap = this.props.hops.map(function (hop) {
                return (<Hop key={hop._id} id={hop._id} name={hop.name} lbs={hop.lbs} ozs={hop.ozs} minutes={hop.minutes} cb={parent.deleteHopCallback}/>)
            });
        }

        return ( 
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Hops</strong></h3>
                        </div>
                        <button onClick={this.addHop} className="add-hop" type="submit">Add New Hop</button>
                        <div className="panel-body" id="savedSection">
                            {hopsMap}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HopsPanel;