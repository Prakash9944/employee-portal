const stripe = require('stripe')('sk_test_51JRfACSHW7pxXseyXxdQ2OaNtf4zypbu5pdCn0B5ussS99j5o0r9j30qs6aqg2PV1yzU8OEGjgHBc93tIDfXtG6J004ct70nht');

exports.createCustomer = function (req, res, next) {

    var obj = {};
    obj.email = req.body.email;
    obj.name = req.body.name;
    obj.description = req.body.description;

    stripe.customers.create(obj).then((result)=> {
        return res.send(result);

    }).catch((error) => {
        return next(error);

    });
}


exports.getCustomer = function (req, res, next) {

    stripe.customers.retrieve(req.params.customerId).then(function (response) {
        console.log('response', response)
        return res.send(response);
    }).catch((err) => {
        return next(err);
    });


    // stripe.customers.retrieve(req.params.customerId, function (err, customer) {
    //     if (err) {
    //         return next(err);
    //     }

    //     return res.json(customer);
    // });
}


exports.createToken = function (req, res, next) {
    var obj = {};
    obj.card = {
        number: "4242424242424242",
        exp_month: 2,
        exp_year: 2024,
        cvc: '212',
    }

    stripe.tokens.create(obj, function (err, tokenCreation) {
        if (err) {
            return next(err);
        }

        return res.json(tokenCreation);
    });
}


exports.addCardToCustomer = function (req, res, next) {
    var customerId  = req.params.id,
        token =  req.params.token;

    if (!customerId) {
        return next(new Error('customerId is missing!'));
    }

    if (!token) {
        return next(new Error('Token is missing!'));
    }

    stripe.customers.createSource(customerId, {source: token || 'tok_1JRhfJSHW7pxXseyg7S8U50l'}, function (err, tokenCreation) {
        if (err) {
            return next(err);
        }

        return res.json(tokenCreation);
    });
}

exports.chargeCustomerThroughID = function (req, res, next) {

    var params = {
        amount: 2000,
        currency: 'usd',
        description: 'First payment',
        customer: 'cus_K5t5afSoZuG6GJ',
    }

    stripe.charges.create(params,  function (err, chargeResponse) {
        if (err) {
            return next(err);
        }

        return res.json(chargeResponse);
    });

}