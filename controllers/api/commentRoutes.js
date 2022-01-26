const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all comments
router.get("/", async (req, res) => {
  try {
    await Comment.findAll({}).then((dbCommentData) => res.json(dbCommentData));
    console.log("Comments retrieved");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// POST a new comment
router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    try {
      await Comment.create({
        content: req.body.content,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id,
      }).then((dbCommentData) => res.json(dbCommentData));
      console.log("New comment succesfully created!");
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
});

// DELETE one comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
        // user should only be able to delete comments they posted
        user_id: req.session.user_id,
      },
    }).then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this ID " });
        return;
      }
      res.json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
