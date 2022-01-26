const User = require("./User");
const Comment = require("./Comment");
const Blog = require("./Blog");

// Blog to User association
Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User to Comment association
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comment to Blog association
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

module.exports = { User, Comment, Blog };
