/* ************************************************************************ */
/*
    Pet Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema= new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    pool_id: {type: Schema.Types.ObjectId, ref: 'Pool'},
    optdata: {type: Schema.Types.ObjectId, ref: 'OptData'},
    family: {type: Schema.Types.ObjectId, ref: 'Family'},
    friends: [{type: Schema.Types.ObjectId, ref: 'Pet'}]
});

var PetModel = mongoose.model('Pet',petSchema);

module.exports=PetModel; 

