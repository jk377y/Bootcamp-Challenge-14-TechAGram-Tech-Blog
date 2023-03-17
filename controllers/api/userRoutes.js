const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//! for all http://localhost:3001/api/users routes

// get all the users
router.get('/', (req, res) => {
    console.log(' https://localhost:3001/api/users GET ALL')  // this is the route that is being hit when the getting data from all users
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get a single user
router.get('/:id', (req, res) => {
    console.log(' https://localhost:3001/api/users GET ONE')  // this is the route that is being hit when the getting data from a single user
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'postContent', 'createdAt']
            },
            {
                model: Comment,
                attributes: ['id', 'commentContent', 'createdAt'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a user
router.post('/', (req, res) => {
    console.log(' https://localhost:3001/api/users POST')  // this is the route that is being hit when the user is created
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// LOGIN user
router.post('/login', (req, res) => {
    console.log(' https://localhost:3001/api/users/login POST') // this is the route that is being hit when the user logs in with the login form
    User.findOne({
        where: { username: req.body.username }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that user name!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// LOGOUT user
router.post('/logout', (req, res) => {
    console.log(' https://localhost:3001/api/users/logout POST')  // this is the route that is being hit when the user logs out
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// DELETE user
router.delete('/:id', (req, res) => {
    console.log(' https://localhost:3001/api/users DELETE') // this is the route that is being hit when the user is being deleted
    User.destroy({
        where: { id: req.params.id }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;