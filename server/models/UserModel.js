var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);