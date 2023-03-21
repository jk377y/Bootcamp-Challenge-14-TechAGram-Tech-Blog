const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//! http://localhost:3001/dashboard routes

// GET- get all posts for the dashboard
router.get('/', withAuth, (req, res) => {
	Post.findAll({
		where: {
			user_id: req.session.user_id
		},
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
		res.render('dashboard', { 
			posts, 
			username: req.session.username, 
			loggedIn: true });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// GET- route to edit post by selecting the id
router.get('/edit/:id', withAuth, (req, res) => {
	Post.findOne({
		where: { id: req.params.id },
		attributes: [ 'id', 'post_content', 'title', 'created_at' ],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
				include: { 	model: User, attributes: ['username'] }
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
		res.render('editPost', { post, username: req.session.username, loggedIn: req.session.loggedIn });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// GET- to route to the addPost page 
router.get('/addPost', withAuth, (req, res) => {
	Post.findAll({
		where: { user_id: req.session.user_id },
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
		res.render('addPost', { posts, loggedIn: true });
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;