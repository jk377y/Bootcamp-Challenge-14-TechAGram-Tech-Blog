const router = require('express').Router();

// import the homeRoutes, dashboardRoutes, and apiRoutes
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);  // http://localhost:3001/
router.use('/dashboard', dashboardRoutes);  // http://localhost:3001/dashboard
router.use('/api', apiRoutes);  // http://localhost:3001/api

// // login page
// router.get('/login', (req, res) => {
// 	console.log('https://localhost:3001/login GET')  // this is the route that is being hit when the getting data from the login page
// 	if (req.session.loggedIn) {
// 		res.redirect('/');
// 		return;
// 	}
// 	res.render('login');
// });

// // signup page 
// router.get('/signup', (req, res) => {
// 	console.log('https://localhost:3001/signup GET')  // this is the route that is being hit when the getting data from the signup page
// 	if (req.session.loggedIn) {
// 		res.redirect('/');
// 		return;
// 	}
// 	res.render('signup');
// });


module.exports = router;