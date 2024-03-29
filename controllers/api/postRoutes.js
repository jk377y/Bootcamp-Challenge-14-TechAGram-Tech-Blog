const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//! http://localhost:3001/api/posts routes

// GET- get all posts
router.get('/', (req, res) => {
	Post.findAll({
		attributes: [ 'id', 'post_content', 'title', 'created_at' ],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
				include: {
					model: User, attributes: ['username']
				}
			},
			{
				model: User, attributes: ['username']
			}
		]
	})
	.then(dbPostData => res.json(dbPostData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// GET- get post by id
router.get('/:id', (req, res) => {
	Post.findOne({
		where: { id: req.params.id },
		attributes: [ 'id', 'post_content', 'title', 'created_at' ],
		include: [
			{
				model: Comment,
					attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
					include: { model: User, attributes: ['username', 'user_id'] }
			},
			{
				model: User, attributes: ['username', 'user_id']
			}
		]
	})
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// POST- add post
router.post('/', withAuth, (req, res) => {
	Post.create({
		title: req.body.title,
		post_content: req.body.post_content,
		user_id: req.session.user_id
	})
	.then(dbPostData => res.json(dbPostData))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// PUT- update post by id
router.put('/:id', withAuth, (req, res) => {
	Post.update(
		{
			title: req.body.title,
			post_content: req.body.post_content
		},
		{
			where: { id: req.params.id }
		}
	)
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// DELETE- delete post by id
router.delete('/:id', withAuth, (req, res) => {
	console.log('id', req.params.id);
	Post.destroy({
		where: { 
			id: req.params.id,
			user_id: req.session.user_id,
		 }
	})
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: 'No post found with this id' });
			return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

module.exports = router;