const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

//! for all http://localhost:3001/api/posts routes

// GET all posts
router.get('/', (req, res) => {
    console.log(' https://localhost:3001/api/posts GET ALL')  // this is the route that is being hit when the getting data from all posts
    Post.findAll({
        attributes: ['id', 'postContent', 'title', 'createdAt'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commentContent', 'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['user_name']
                }
            },
            {
                model: User,
                attributes: ['user_name']
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
        attributes: ['id', 'postContent', 'title', 'createdAt'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commentContent', 'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['user_name']
                }
            },
            {
                model: User,
                attributes: ['user_name']
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
        postContent: req.body.postContent,
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
            postContent: req.body.postContent
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