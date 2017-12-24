const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config.json')[env];

const userService = require('../services/userService');
const utilityService = require('../services/utilityService');

// middleware to verify a token
router.use(function (req, res, next) {
    
    // get token from cookies
    const token = req.cookies.jwtToken;
    
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.superSecret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                req.decoded = decoded; 
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/', function(req, res, next) {
    res.render('index');
    
});

router.post('/get/placeSuggestions', function(req, res, next) {
    const params = req.body;

    // uncomment this block if you don't have google autocomplete place API key
    res.json({
        success: true,
        suggestions: ['Patna', 'Ranchi', 'Delhi', 'Bangalore', 'Chandigarh', 'Hyderabad']
    });

    // comment this block if you don't have google autocomplete place API key
    /*utilityService.suggestPlaces(params)
        .then(predictions => {
            let suggestions = [];
            predictions.forEach(place => {
                suggestions.push(place.description);
            });

            // send suggestions -> array of place names
            res.json({
                success: true,
                suggestions: suggestions
            });
        }).catch(err => {
            res.json({
                success: false,
                message: err
            });
        });*/
});

router.post('/save/searchedPlace', function(req, res, next) {
    const place = req.body;
    const user = {};
    user.email = req.decoded.email;
    user.place = place;
    userService.saveSearch(user)
        .then(place => {
            res.json({
                success: true,
                place: place
            });
        }).catch(err => {
            res.json({
                success: false,
                message: err
            });
        });
});


router.post('/get/searchedPlaces', function(req, res, next) {
    const user = {};
    user.email = req.decoded.email;
    userService.getSearchedPlaces(user)
        .then(places => {
            res.json({
                success: true,
                searchedPlaces: places
            });
        }).catch(err => {
            res.json({
                success: false,
                message: err
            });
        });
});

module.exports = router;
