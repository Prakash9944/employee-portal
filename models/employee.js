const mongoose = require ("mongoose"),
      Schema = mongoose.Schema,
      CreateUpdatedAt = require('mongoose-timestamp');

var Employee = new Schema ({
    employeeName: String,
    dateOfBirth: Date,
    mobileNumber: Number,
    email: String,
    department: String,
    gender: String,
    employeeCode: Schema.Types.Mixed,
});

Employee.plugin(CreateUpdatedAt);
module.exports = mongoose.model('employee', Employee);