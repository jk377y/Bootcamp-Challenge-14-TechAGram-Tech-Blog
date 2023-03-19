const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//! http://localhost:3001/api/comments

// GET- all comments
router.get('/', (req, res) => {
	Comment.findAll()
		.then(dbCommentData => res.json(dbCommentData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST- a comment
router.post('/', withAuth, (req, res) => {
	Comment.create({
		comment_text: req.body.comment_text,
		user_id: req.session.user_id,
		post_id: req.body.post_id
	})
	.then(dbCommentData => res.json(dbCommentData))
	.catch(err => {
		console.log(err);
		res.status(400).json(err);
	});
});

// PUT- update a comment by id
router.put('/:id', withAuth, (req, res) => {
	Comment.update(
		{
			comment_text: req.body.comment_text,
			user_id: req.session.user_id,
		},
		{
			where: { id: req.params.id }
		}
	)
	.then(dbPostData => {
		if (!dbPostData) {
			res.status(404).json({ message: 'No comment found with this id' });
			return;
		}
		res.json(dbPostData);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// DELETE- delete a comment by id
router.delete('/:id', withAuth, (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.id,
			user_id: req.session.user_id,
		}
	})
	.then(dbCommentData => {
		if (!dbCommentData) {
			res.status(404).json({ message: 'No comment found with this id!' });
			return;
		}
		res.json(dbCommentData);
	})
	.catch(err => {
		console.log(err);
		alert('You can only delete your own comments!');
		res.status(500).json(err);
	});
});

module.exports = router;