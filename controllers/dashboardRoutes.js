const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//! for all http://localhost:3001/dashboard routes

// get all posts for dashboard
router.get("/", withAuth, (req, res) => {
	Post.findAll({
		where: { user_id: req.session.user_id },
		attributes: ["id", "title", "postContent", "createdAt"],
		include: [
			{
				model: Comment,
				attributes: ["id", "commentContent", "postId", "userId", "createdAt"],
				include: { model: User, attributes: ["userName"] },
			},
			{
				model: User,
				attributes: ["userName"],
			},
		],
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render("dashboard", { posts, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// edit a single post
router.get("/edit/:id", withAuth, (req, res) => {
	Post.findOne({
		where: { id: req.params.id },
		attributes: ["id", "title", "postContent", "createdAt"],
		include: [
			{
				model: Comment,
				attributes: ["id", "commentContent", "postId", "userId", "createdAt"],
				include: {
					model: User,
					attributes: ["userName"],
				},
			},
			{
				model: User,
				attributes: ["userName"],
			},
		],
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}
			const post = dbPostData.get({ plain: true });
			res.render("editPost", {
				post,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// create a new post 
router.get('/addPost', withAuth, (req, res) => {
	Post.findAll({ where: {	user_id: req.session.user_id },
		attributes: ['id', 'title', 'postContent', 'createdAt'],
	  include: [
		{
		  model: Comment,
		  attributes: ['id', 'commentContent', 'postId', 'userId', 'createdAt'],
		  include: {
			model: User,
			attributes: ['userName']
		  }
		},
		{
		  model: User,
		  attributes: ['userName']
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