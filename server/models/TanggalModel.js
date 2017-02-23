var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TanggalSchema = new Schema({	tanggal : String,	frequency : Number},{
	timestamps: true
});

module.exports = mongoose.model('Tanggal', TanggalSchema);
