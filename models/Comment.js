const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

// creates the Comment model
Comment.init(
  {
    id: {  // setting up properties for the Comment model
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    commentContent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",  // references the User model's id property as the foreign key
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",  // references the Post model's id property as the foreign key
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "comment",
  }
);

module.exports = Comment;
