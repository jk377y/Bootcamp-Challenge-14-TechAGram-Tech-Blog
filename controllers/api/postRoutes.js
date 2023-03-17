const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

//! for all http://localhost:3001/api/posts routes

// GET all posts
router.get('/', (req, res) => {
    console.log(' https://localhost:3001/api/posts GET ALL')
    Post.findAll({
        attributes: ['id', 'postContent', 'title', 'createdAt'],
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});