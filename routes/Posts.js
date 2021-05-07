const express = require("express");
const router = express.Router();
const { Posts, Members } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all data
router.get("/", async (req, res) => {
  try {
    const listOfPost = await Posts.findAll({
      include: [Members],
    });
    res.json(listOfPost);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Something when wrong!" });
  }
});

// Find item from id
router.get("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Posts.findByPk(id);
    res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Post not found!" });
  }
});

// Create data
router.post("/", validateToken, async (req, res) => {
  const post = req.body;

  try {
    await Posts.create(post);
    res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Failed created data!" });
  }
});

// Update Data
router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const { title, desc, link, task, date, image, member } = req.body;

  try {
    const post = await Posts.findOne({ where: { id: id } });

    post.title = title;
    post.desc = desc;
    post.link = link;
    post.task = task;
    post.date = date;
    post.image = image;
    post.member = member;

    await post.save();

    return res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Failed updated data!" });
  }
});

// Delete Data
router.delete("/delete/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Posts.findOne({ where: { id: id } });
    await post.destroy();

    return res.json({ message: "Post has been deleted " });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Failed deleted data!" });
  }
});

module.exports = router;
