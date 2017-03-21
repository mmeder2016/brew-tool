/* ************************************************************************ */
/*
    User Schema -                                    
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema= new Schema({
    fname: String,
    lname: String,
    uname: String,
    uemail: String,
    uzip: String,
    upassw: String,
    //last: {type: Date, default: Date.now},
    status: {type: Boolean, default: false},
    pets: [{type: Schema.Types.ObjectId, ref: 'Pet'}]
});

var UserModel = mongoose.model('User',userSchema);

module.exports=UserModel; 

