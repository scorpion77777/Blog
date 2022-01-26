const sequelize = require("../config/connection");
const { User, Comment, Blog } = require("../models");

const userData = require("./userData.json");
const commentData = require("./commentData.json");
const blogData = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData, {
    user_id: users[Math.floor(Math.random() * users.length)].id,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
