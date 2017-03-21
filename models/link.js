/* ************************************************************************ */
/*
    Rescue Organization Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema= new Schema({
    title: String,
    link: String,
    descr: String
});

var LinkModel = mongoose.model('Link',linkSchema);

module.exports=LinkModel; 
