var express = require('express');
var router = express.Router();

var env = process.env.NODE_ENV || 'development';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/login', function(req, res, next) {
    res.render('login', { 
    	pageTitle: 'Login',
    	errorMessage: '' 
    });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', {
    	pageTitle: 'Signup'
    });
});

router.post('/login', function(req, res, next) {
	var params = req.body;
	userService.login(params, function failureCallback(errorMessage) {
		res.render('login', { 
			pageTitle: 'Login',
			errorMessage: 'Wrong Mobile No and Password!!'
		});
	}, function successCallback(user) {
		var token = utilityService.getToken(user);
        res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
    	res.redirect('/api/dashboard');
	});
    
});



router.post('/signup', function(req, res, next) {
	var params = req.body;
	userService.signup(params, function failureCallback(errorMessage) {
		res.json({
			success: false,
			message: errorMessage
		});
	}, function successCallback(user) {
		var token = utilityService.getToken(user);
        res.cookie('jwtToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // maxAge: 2 hours
		res.json({
			success: true
		});

		// sending welcome mail
		utilityService.sendWelcomeMail(user);

		// sending Welcome Message
		utilityService.sendWelcomeMessage(user);
	});
    
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('jwtToken');
	res.redirect('/');
});

module.exports = router;