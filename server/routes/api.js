var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var env = process.env.NODE_ENV || 'development';

// for uploading files
var path = require('path');

// middleware to verify a token
router.use(function (req, res, next) {
    
    // get token from cookies
    var token = req.cookies.jwtToken;
    
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.superSecret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {

                // check if admin/hospitalAdmin tries user routes
                if (!decoded.ssid) {
                    res.redirect('/login');
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded; 
                    next();
                }
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/dashboard', function(req, res, next) {
    var ssid = req.decoded.ssid;
    var params = {
        mobile: req.decoded.mobile,
        name: req.decoded.name,
        pageTitle: 'Hello ' + req.decoded.name + '!!',
        ssid: ssid
    };
    res.render('dashboard', params);
    
});

router.post('/get/user', function(req, res, next) {
    var params = req.body;
    if (params.ssid) {
    } else {
        params.ssid = req.decoded.ssid;
    }
    userService.getUser(params, function failureCallback(errorMessage) {
        res.json({
            success: false,
            message: errorMessage
        });
    }, function successCallback(user) {
        res.json({
            success: true,
            user: user
        });
    });
});

router.post('/get/user/details', function(req, res, next) {
    var ssid = req.decoded.ssid;
    var params = {};
    params.ssid = ssid;
    userService.getUserDetails(params, function failureCallback(errorMessage) {
        res.json({
            success: false,
            message: errorMessage,
            userDetails: {}
        });
    }, function successCallback(userDetails) {
        res.json({
            success: true,
            userDetails: userDetails
        });
    });
});

router.post('/update/user/profile', function(req, res, next) {
    var params = req.body;
    params.ssid = req.decoded.ssid;

    // user can't update mobile for now
    if (params.mobile) {
        delete params.mobile;
    }
    userService.updateUserProfile(params, function failureCallback(errorMessage) {
        res.json({
            success: false,
            message: errorMessage
        });
    }, function successCallback(user) {
        res.json({
            success: true,
            user: user
        });
    });
});

router.post('/search/users', function(req, res, next) {
    var params = req.body;
    userService.searchUsers(params, function failureCallback(errorMessage) {
        res.json({
            success: false,
            message: errorMessage
        });
    }, function successCallback(users) {
        res.json({
            success: true,
            users: users
        });
    });
});

router.post('/add/familyMember', function(req, res, next) {
    const params = req.body;
    params.userSsid = req.decoded.ssid;
    if (params.userSsid == params.relatedUserSsid) {
        res.json({
            success: false,
            message: 'You cannot add yourself'
        });
    } else {
        userService.addFamilyMember(params)
            .then((relationshipMapping) => {
                res.json({
                    success: true,
                    relationshipMapping: relationshipMapping
                });
            }).catch((err) => {
                res.json({
                    success: false,
                    message: err
                });
            });
    }
});

router.post('/delete/familyMember', function(req, res, next) {
    const params = req.body;
    userService.deleteFamilyMember(params)
        .then((success) => {
            res.json({
                success: success
            });
        }).catch((err) => {
            res.json({
                success: false,
                message: err
            });
        });
});

module.exports = router;
