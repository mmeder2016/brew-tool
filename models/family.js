/* ************************************************************************ */
/*
    Family / Sibling Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var familySchema= new Schema({
    members: [{type: Schema.Types.ObjectId, ref: 'Pet'}]
});

var FamilyModel = mongoose.model('Family',familySchema);

module.exports=FamilyModel; 

