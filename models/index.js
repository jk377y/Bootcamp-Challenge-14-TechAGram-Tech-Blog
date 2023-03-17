// import models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");


// establish associations
User.hasMany(Post, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
    foreignKey: "postId"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

Post.belongsTo(User, {
    foreignKey: "userId"
});

Post.hasMany(Comment, {
    foreignKey: "postId",
    onDelete: "CASCADE"
});

module.exports = { User, Comment, Post }; // exports the User, Comment, and Post models