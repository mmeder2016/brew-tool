/* ************************************************************************ */
/*
    Optional Pet Data Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optdataSchema= new Schema({
    rescue_id: {type: Schema.Types.ObjectId, ref: 'Rescue'},
    rescue_name: String,
    adopt_date: Date,
    adopt_name: String,
    bio: String,
    sib_count: Number,
    sib_names: [{type: String}]
});

var OptDataModel = mongoose.model('Optdata',optdataSchema);

module.exports=OptDataModel; 

