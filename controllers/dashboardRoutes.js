const router = require('express').Router();
const { Post, User, Comment } = require('../models');

//! for all http://localhost:3001/dashboard routes

// get all posts for dashboard
router.get('/', (req, res) => {
	console.log(' https://localhost:3001/dashboard GET ALL') // this is the route that is being hit when the getting data from all posts w/comment and user data for the dashboard
	Post.findAll({
		where: { user_id: req.session.user_id },
		attributes: ['id', 'title', 'post_content', 'createdAt'],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_content', 'post_id', 'user_id', 'createdAt'],
				include: { model: User, attributes: ['username'] },
			},
			{
				model: User,
				attributes: ['username'],
			},
		],
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render('dashboard', { posts, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET page to edit a post
router.get('/editPost/:id', (req, res) => {
	console.log('https://localhost:3001/dashboard/editPost/:id GET ONE') // this is the route that is being hit when getting the edit post form
	Post.findOne({
		where: { id: req.params.id },
		attributes: ['id', 'title', 'post_content', 'createdAt'],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_content', 'post_id', 'user_id', 'createdAt'],
				include: {
					model: User,
					attributes: ['username'],
				},
			},
			{
				model: User,
				attributes: ['username'],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: 'No post found with this id' });
				return;
			}
			const post = dbPostData.get({ plain: true });
			res.render('editPost', {
				post,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET page to create a new post 
router.get('/newPost', (req, res) => {
	console.log('https://localhost:3001/dashboard/newPost GET ONE') // this is the route that is being hit when the getting the new post form
	Post.findAll({ where: {	user_id: req.session.user_id },
		attributes: ['id', 'title', 'post_content', 'createdAt'],
	  include: [
		{
		  model: Comment,
		  attributes: ['id', 'comment_content', 'post_id', 'user_id', 'createdAt'],
		  include: {
			model: User,
			attributes: ['username']
		  }
		},
		{
		  model: User,
		  attributes: ['username']
		}
	  ]
	})
	  .then(dbPostData => {
		const posts = dbPostData.map(post => post.get({ plain: true }));
		res.render('newPost', { posts, loggedIn: true });
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json(err);
	  });
	});
  
  module.exports = router;