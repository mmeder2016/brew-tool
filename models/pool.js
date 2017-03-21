/* ************************************************************************ */
/*
    Pet Pool Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poolSchema= new Schema({
    species: Number,    // 0 = dog, 1 = cat, 2 = ???, etc
    name: String,
    status: Number,
    bday: Date,
    gender: Boolean,
    image: String,
    bio: String
});

var PoolModel = mongoose.model('Pool',poolSchema);

module.exports=PoolModel; 
