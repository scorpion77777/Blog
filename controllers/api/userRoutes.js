const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all users
router.get("/", async (req, res) => {
  try {
    // ACCESS user model and run .findAll method
    await User.findAll({ exclude: ["password"] }).then((dbUserData) =>
      res.json(dbUserData)
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user
router.get("/:id", async (req, res) => {
  try {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Blog,
          attributes: ["id", "title", "content", "date_created"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "date_created"],
          include: {
            model: this.post,
            attributes: ["title"],
          },
        },
      ],
    }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user exists with this id" });
        return;
      }
      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// USER LOGOUT
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT one user
router.put("/:id", withAuth, async (req, res) => {
  try {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    }).then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.status(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE one user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.status(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
