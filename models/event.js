/* ************************************************************************ */
/*
    Event Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema= new Schema({
    title: String,
    descr: String,
    dates: String,
    link: String,
    loc: String,
    zip: String
});

var EventModel = mongoose.model('Event',eventSchema);

module.exports=EventModel; 

