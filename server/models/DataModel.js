var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var DataSchema = new Schema({	letter : String,	frequency : Number},{
	timestamps: true
});

module.exports = mongoose.model('Data', DataSchema);
