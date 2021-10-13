const mongoose = require ("mongoose"),
      Schema = mongoose.Schema,
      CreateUpdatedAt = require('mongoose-timestamp');

const Department = new Schema({
    deptname: String,
    ordno: Number,
    mstatus: Number,
    updby: Number,
    updon:  Date,
});

// Department.statics.list = function(options, cb) {
//     var options = options || {},
//         query = options.query || {};

//     this.find(query)
//         .sort({
//             'createdAt': -1
//         }) // sort by date
//         .exec(cb)
// };

Department.plugin(CreateUpdatedAt);
module.exports = mongoose.model('department', Department);