const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts for homepage
router.get("/", async (req, res) => {
	try {
		Post.findAll({
			attributes: ["id", "title", "postContent", "createdAt"],
			include: [
				{
					model: Comment,
					attributes: ["id", "commentContent", "userId", "postId", "createdAt"],
					include: 
						{model: User,attributes: ["username"]},
				},
				{
					model: User,
					attributes: ["userName"],
				},
			],
		}).then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render("homepage", {posts, loggedIn: req.session.loggedIn});
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// get single post
router.get('/post/:id', (req, res) => {
	Post.findOne({
	  where: {id: req.params.id},
	  attributes: [ 'id', 'title', 'postContent', 'createdAt'],
	  include: [
		{
		  model: Comment,
		  attributes: ['id', 'commentContent', 'postId', 'userId', 'createdAt'],
		  include: { model: User, attributes: ['username'] }
		},
		{
		  model: User,
		  attributes: ['userName']
		}
	  ]
	})
	  .then(dbPostData => {
		if (!dbPostData) {
		  res.status(404).json({ message: 'Not Found' });
		  return;
		}
		// serialize the data
		const post = dbPostData.get({ plain: true });
		console.log(req.session.loggedIn);
		// pass data to template
		res.render('singlePost', {
		  post,
		  loggedIn: req.session.loggedIn
		});
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json(err);
	  });
  });

// login page
router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}
	res.render("login");
});

// signup page 
router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
	  res.redirect('/');
	  return;
	}
  
	res.render('signup');
});

module.exports = router;
