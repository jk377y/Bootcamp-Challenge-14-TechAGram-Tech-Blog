const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

//! for all http://localhost:3001/api/posts routes

// GET all posts
router.get('/', (req, res) => {
    console.log(' https://localhost:3001/api/posts GET ALL')  // this is the route that is being hit when the getting data from all posts
    Post.findAll({
        attributes: ['id', 'post_content', 'title', 'createdAt'],
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET a single post
router.get('/:id', (req, res) => {
    console.log(' https://localhost:3001/api/posts GET ONE')  // this is the route that is being hit when the getting data from a single post
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'post_content', 'title', 'createdAt'],
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

// POST a post
router.post('/', (req, res) => {
    console.log(' https://localhost:3001/api/posts POST')  // this is the route that is being hit when the post is created
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT update a post
router.put('/:id', (req, res) => {
    console.log(' https://localhost:3001/api/posts PUT')  // this is the route that is being hit when the post is updated
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

// DELETE a post
router.delete('/:id', (req, res) => {
    console.log(' https://localhost:3001/api/posts DELETE')  // this is the route that is being hit when the post is deleted
    Post.destroy({
        where: { id: req.params.id }
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