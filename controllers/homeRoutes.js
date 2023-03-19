const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//! http://localhost:3001/ routes

// GET- get all posts for homepage
router.get('/', (req, res) => {
	Post.findAll({
		attributes: [ 'id', 'post_content', 'title', 'created_at' ],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
				include: { model: User, attributes: ['username'] }
			},
			{
				model: User,
				attributes: ['username']
			}
		]
	})
	.then(dbPostData => {
		const posts = dbPostData.map(post => post.get({ plain: true }));
		res.render('homepage', {
			posts,
			username: req.session.username,
			loggedIn: req.session.loggedIn
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// GET- if logged in reroute to home page, otherwise render login page 
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

// GET- if logged in reroute to home page, otherwise render signup page 
router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('signup');
});

// GET- find a post by id 
router.get('/post/:id', (req, res) => {
	Post.findOne({ 
		where: { id: req.params.id },
		attributes: [ 'id', 'post_content', 'title', 'created_at' ],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
				include: { model: User, attributes: ['username'] }
			},
			{
				model: User,
				attributes: ['username']
			}
		]
	})
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		const post = dbPostData.get({ plain: true });
		console.log(req.session.loggedIn);
		res.render('onePost', {
			post,
			loggedIn: req.session.loggedIn
		});
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;