const router = require("express").Router();
const { Comment } = require("../../models");

//! for all http://localhost:3001/api/comments routes

// GET all comments
router.get("/", (req, res) => {
	console.log('https://localhost:3001/api/comments GET ALL')  // this is the route that is being hit when the getting data from all comments
	Comment.findAll()
		.then((commentData) => res.json(commentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST a comment
router.post("/", (req, res) => {
	console.log('https://localhost:3001/api/comments POST')  // this is the route that is being hit when the adding a comment to a post
	if (req.session) {
		Comment.create({
			commentContent: req.body.commentContent,
			user_id: req.session.user_id,
			post_id: req.body.post_id,
		})
			.then((dbCommentData) => res.json(dbCommentData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});

// (PUT) update a comment by id
router.put("/:id", (req, res) => {
	console.log('https://localhost:3001/api/comments PUT')  // this is the route that is being hit when the updating a comment
	Comment.update(
		{
			commentContent: req.body.commentContent,
			user_id: req.session.user_id,
		},
		{
			where: { id: req.params.id },
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No comment found with this id" });
				return;
			}
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE a comment by id
router.delete("/:id", (req, res) => {
	console.log('https://localhost:3001/api/comments DELETE')  // this is the route that is being hit when the deleting a comment
	Comment.destroy({
		where: { id: req.params.id, user_id: req.session.user_id, },
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment found with this id!" });
				return;
			}
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
