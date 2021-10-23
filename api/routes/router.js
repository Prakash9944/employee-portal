const express       =  require ('express'),
      Router        =  express.Router(),
      department    =  require ('../controller/department'),
      employee      =  require ('../controller/employee'),
      stripe        =  require ('../controller/stripe/stripe');

// Department Routes
Router
    .get('/department/GetAllDepartment', department.getAllDepartments)
    .get('/department/GetDepartmentMaxOrdNo', department.getDepartmentMaxOrderNumber)
    .post('/department/insertDepartment', department.insertDepartment)
    .delete('/department/deleteDepartment/:id', department.deleteDepartment)

// Employee Routes
    .post('/employee/addEmployee', employee.addEmployee)
    .put('/employee/updateEmployee', employee.editEmployee)
    .get('/employee/getAllEmployee', employee.getAllEmployee)
    .delete('/employee/deleteEmployee/:id', employee.deleteEmployee)

// Stripe Routes
    .post('/stripe/createCustomer', stripe.createCustomer)
    .get('/stripe/getCustomer/:customerId', stripe.getCustomer)
    .post('/stripe/createToken', stripe.createToken)
    .post('/stripe/addCardToCustomer/:id', stripe.addCardToCustomer)

// Fetch routes
    .get('/department/fetch', department.externalCall)


module.exports = Router;