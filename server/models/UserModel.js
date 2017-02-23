var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({	username : {type:String, unique:true},	password : String},{
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
