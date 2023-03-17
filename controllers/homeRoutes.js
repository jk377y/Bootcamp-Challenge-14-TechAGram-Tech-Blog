const router = require("express").Router();
const { Post, User, Comment } = require("../models");

//! for all http://localhost:3001 routes

// get all posts for homepage
router.get("/", async (req, res) => {
	console.log('https://localhost:3001/ GET ALL')  // this is the route that is being hit when the getting all the post for the homepage
	try {
		Post.findAll({
			attributes: ["id", "title", "postContent", "createdAt"],
			include: [
				{
					model: Comment,
					attributes: ["id", "commentContent", "userId", "postId", "createdAt"],
					include:
						{ model: User, attributes: ["username"] },
				},
				{
					model: User,
					attributes: ["userName"],
				},
			],
		}).then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));
			res.render("homepage", { posts, loggedIn: req.session.loggedIn });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// get single post
router.get('/post/:id', (req, res) => {
	console.log('https://localhost:3001/post/:id GET ONE')  // this is the route that is being hit when the getting data from a single post
	Post.findOne({
		where: { id: req.params.id },
		attributes: ['id', 'title', 'postContent', 'createdAt'],
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
	console.log('https://localhost:3001/login GET')  // this is the route that is being hit when the getting data from the login page
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}
	res.render("login");
});

// signup page 
router.get('/signup', (req, res) => {
	console.log('https://localhost:3001/signup GET')  // this is the route that is being hit when the getting data from the signup page
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('signup');
});

module.exports = router;
