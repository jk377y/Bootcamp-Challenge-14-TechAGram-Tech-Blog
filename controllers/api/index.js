const router = require('express').Router();

// import all of the API routes
const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);  // http://localhost:3001/api/users
router.use('/posts', postRoutes);  // http://localhost:3001/api/posts
router.use('/comments', commentRoutes);  // http://localhost:3001/api/comments

module.exports = router;