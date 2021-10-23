var Department = require ('../../models/department');
// var fetch = require('node-fetch');
var request = require('request');

exports.getAllDepartments = async function (req, res, next) {

    // Using Promise we got department list
    // Department.find({}).then(function (response) {
    //     return res.status(200).send(response);

    // }).catch(function (err) {
    //     return next(err);
    // })

    // Using async await we got all documents
    try {
        var allDocuments = await Department.find({});
        return res.status(200).json(allDocuments);

    } catch (err) {
        return next(err);

    }

    // Using Callback we got department list
    // Department.find({}, function (err, departments) {
    //     if (err || !departments.length) {
    //         console.error(err)
    //         return next (err);
    //     }
    //     console.log('departments', departments)
    //     console.log('asdsa')
    //     return res.send(departments);
    // });
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
    
    var createEmployee = new Promise (function (resolve, reject) {
        Department.create(query, function (err, result) {
            if (err) {
                return reject(err);
            }

            return resolve(result)
        });
    })

    createEmployee.then(function (response) {
        return res.status(200).send(response);
    })

    createEmployee.catch(function (err) {
        return next(err);
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

    // Using Promise we were deleted one record to mongodb
    // Department.findOneAndDelete(query).then((response) => {
    //     return res.status(200).send(response);

    // }).catch((err) => {
    //     return next(err);

    // });

    // Using Customized Promise we were deleted one record to mongodb
    var deltedRecord = new Promise(function (resolve, reject) {

        Department.findOneAndDelete(query, function (err, result) {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    })

    deltedRecord.then(function (response) {
        return res.status(200).json({messge: 'deleted successfully'});
    })

    deltedRecord.catch(function (err) {
        // var error = new Error('could not deleted');
        // error.statusCode = 301;
        // return next(error);
        return res.status(305).json({messge: "could not deleted"})
    })

    // Using callback function we were delete record to mongo
    // Department.findOneAndDelete(query, function (err, result) {
    //     if (err) {
    //         console.error(err);
    //     }

    //     return res.json({'msg': 'deleted successfully'});
    // });
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

exports.externalCall = function (req, res, next) {

    // Using request library with callback function
    // request('https://jsonplaceholder.typicode.com/todos/1', function (err, result, body) {
    //     if (err) {
    //         console.error(err)
    //     }

    // });

    var fetchCall = new Promise(function (resolve, reject) {
        request('https://jsonplaceholder.typicode.com/todos/1', function (err, result, body) {

            if (err) {
                console.error(err);
                return reject(err)
            }

            return reject({body, statusCode: result.statusCode});
        });
    });

    fetchCall.then(function (response) {
        return res.send(response);

    });

    fetchCall.catch(function (err) {
        return res.send(err);

    });

}