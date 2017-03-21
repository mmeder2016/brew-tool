/* ************************************************************************ */
/*
    Rescue Organization Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rescueSchema= new Schema({
    rescue_name: String,
    link: String,
    zip: String,             // might not use this
    needshelp: {type: Boolean, default: false}
});

var RescueModel = mongoose.model('Rescue',rescueSchema);

module.exports=RescueModel; 

