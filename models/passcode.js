var mongoose = require('mongoose');

var passcodeSchema = new mongoose.Schema({
    code: {type:String, required:true}
});
module.exports = mongoose.model('passcode', passcodeSchema);
