var Employee = require ('../../models/employee');

exports.addEmployee = function (req, res, next) {
    console.log('req', req.body)
    var query = {
        employeeName: req.body.empname,
        dateOfBirth: req.body.dob,
        mobileNumber: req.body.mob,
        email: req.body.email,
        department: req.body.department,
        gender: req.body.gender,
        employeeCode: req.body.empcode,
    };

    Employee.create(query, function (err, result) {
        if (err) {
            return next(err);
        }

        return res.send(result);
    });
}

exports.getAllEmployee = function (req, res, next) {

    Employee.find({}, function (err, employees) {
        if (err || !employees.length) {
            return next (err);
        }

        return res.send (employees);
    });
}


exports.editEmployee = function (req, res, next) {
    var id = req.params.id;

    if (!id) {
        return next(new Error('Id is missing!'));
    }

    var query = {

    };

    Employee.findByIdAndUpdate(query, function (error, result) {
        if (error) {
            return next(error);
        }

        return res.send(result);
    });
}

exports.deleteEmployee = function (req, res, next) {
    var id = req.params.id;
    console.log('iddd', id)
    if (!id) {
        return next(new Error('Id is missing!'));
    }

    var query = {
        _id: id
    };

    Employee.findOneAndDelete(query, function (err, result) {
        if (err) {
            console.error(err);
        }

        return res.json({'msg': 'deleted successfully'});
    });
}