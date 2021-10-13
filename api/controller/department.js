var Department = require ('../../models/department');

exports.getAllDepartments = function (req, res, next) {

    Department.find({}, function (err, departments) {
        if (err || !departments.length) {
            console.error(err)
            return next (err);
        }

        return res.send (departments);
    });
}

exports.getDepartmentMaxOrderNumber = function (req, res, next) {

    Department.findOne({}).sort({_id:-1}).limit(1).exec(function(err, maxOrdNo) {
        if (err || !maxOrdNo) {
            return next(err);
        }

        maxOrdNo.ordno = parseInt(maxOrdNo.ordno)
        return res.send(maxOrdNo);
    });
}


exports.insertDepartment = function (req, res, next) {

    var query = {
        deptname: req.body.deptname,
        ordno: req.body.ordno,
        mstatus: req.body.mstatus,
        updby: req.body.updby
    }
    
    Department.create(query, function (err, result) {
        if (err) {
            return next(err);
        }

        return res.send(result)
    });
}


exports.deleteDepartment = function (req, res, next) {
    var id = req.params.id;

    if (!id) {
        return next(new Error('Id is missing!'));
    }

    var query = {
        _id: id
    };

    Department.findOneAndDelete(query, function (err, result) {
        if (err) {
            console.error(err);
        }

        return res.json({'msg': 'deleted successfully'});
    });
}


exports.editDepartment = function (req, res, next) {
    var id = req.params.id;

    if (!id) {
        return next(new Error('Id is missing!'));
    }
    var query = {

    };

    Department.findByIdAndUpdate(query, function (error, result) {
        if (error) {
            return next(error);
        }

        return res.send(result);
    });
}