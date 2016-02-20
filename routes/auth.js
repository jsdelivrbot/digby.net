'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function (req, res) {
	res.render('login', { user: req.user });
});

router.get('/callback',
	passport.authenticate('auth0'), (req, res) => {
		let returnTo = req.session.redirectTo || '/';
		delete req.session.redirectTo;
		res.redirect(returnTo);	
	});

router.get('/google',
	passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/drive.photos.readonly']
	}),
	function (req, res) {
	});

router.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;