const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//! for all /dashboard routes

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({ where: {user_id: req.session.user_id},
      attributes: ['id', 'postContent', 'title', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'commentContent', 'postId', 'userId', 'createdAt'],
          include: { model: User, attributes: ['userName'] }
        },
        {
          model: User,
          attributes: ['userName']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
