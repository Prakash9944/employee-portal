const mongoose  = require("mongoose");

var connectDB = async function () {
    await mongoose.connect('mongodb://localhost:27017/vap', {useNewUrlParser: true,  useFindAndModify: false, useUnifiedTopology: true }   , function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("mongodb connected successfully");
    });
}

module.exports = connectDB;