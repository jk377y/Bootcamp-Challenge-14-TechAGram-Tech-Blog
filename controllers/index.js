const router = require('express').Router();

// import the homeRoutes, dashboardRoutes, and apiRoutes
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);  // http://localhost:3001/
router.use('/dashboard', dashboardRoutes);  // http://localhost:3001/dashboard
router.use('/api', apiRoutes);  // http://localhost:3001/api

module.exports = router;