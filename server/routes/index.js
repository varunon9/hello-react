const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const userService = require('../services/userService');
const utilityService = require('../services/utilityService');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/login', function(req, res, next) {
    res.render('index');
});

router.get('/signup', function(req, res, next) {
    res.render('index');
});


router.post('/login', function(req, res, next) {
	const params = req.body;
	userService.login(params)
	    .then(user => {
			const token = utilityService.getToken(user);
	        res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
	    	res.json({
	    		success: true,
	    		user: user
	    	});
	    }).catch(err => {
	    	res.json({ 
	    		success: false, 
	    		message: err 
	    	}); 
	    });
});



router.post('/signup', function(req, res, next) {
	const params = req.body;
	userService.signup(params)
	    .then(user => {
			const token = utilityService.getToken(user);
	        res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
	    	res.json({
	    		success: true,
	    		user: user
	    	});
	    }).catch(err => {
	    	res.json({ 
	    		success: false, 
	    		message: err 
	    	}); 
	    });
    
});

router.post('/logout', function(req, res, next) {
	res.clearCookie('jwtToken');
	res.json({success: true});
});

module.exports = router;