// Include React
var React = require("react");

var CalculationsPanel = React.createClass({

    getOG: function(){
        return "0";
    },
    getFG: function(){
        return "0";
    },
    getSRM: function(){
        return "0";
    },
    getABV: function(og, fg){
        return ((og * 1000) - (fg * 1000)) / 7.5;
    },

    getIBU: function() {
        console.log('Main getIBU : function () {');
        var totalIBU = 0;
        if(Array.isArray(this.props.recipe.hops)) {
            this.props.recipe.hops.forEach(function(element) {
                var oz = (parseInt(element.lbs, 10) * 16) + parseInt(element.ozs, 10);
                var aa = parseInt(element.alphaAcid, 10);
                var t = parseInt(element.minutes, 10);

                var pu = 0;
                if(t > 51) { pu = 30;} 
                else if (t >46) { pu = 28.1; } 
                else if (t > 41) { pu = 26.9; } 
                else if (t > 36) { pu = 22.8; } 
                else if (t > 31) { pu = 18.8; } 
                else if (t > 26){ pu = 15.3; } 
                else if (t > 21) { pu = 12.1; } 
                else if (t > 16) { pu = 10.1; } 
                else if (t > 11) { pu = 8; } 
                else if (t > 6){pu = 6; } 
                else  {pu = 5; }
                // (ounces) * (alpha acid) * (percent utilization)
                var ibu = ( (oz * aa * pu) / 7.25);
                totalIBU += ibu;
            });
        } else {
            console.log('hop array not array yet');
        }
        console.log('IBU: '+ totalIBU);
        return totalIBU;
    },

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('Component DID UPDATE!');
    //     this.updateCalculatedValues();
    // },


    render: function() {
        console.log('CalculationsPanel render: function () {');

        return ( 
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Calculations</strong></h3>
                        </div>
                        <div className="panel-body" id="savedSection">
                            RecipeName:{this.props.recipe.recipeName} Brew Date:{this.props.recipe.brewDate} style:{this.props.recipe.style} Batch Size:{this.props.recipe.batchSize}
                        </div>


                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>Calculations</strong></h3>
                            </div>
                            <div className="panel-body" id="savedSection">
                                IBU:{this.getIBU()} OG:{this.getOG()} FG:{this.getFG()} SRM:{this.getSRM()} ABV:{this.getABV()}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CalculationsPanel;