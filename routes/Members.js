const e = require("express");
const express = require("express");
const router = express.Router();
const { Members } = require("../models");

// Default route get all members ===================================
router.get("/", async (req, res) => {
  try {
    const members = await Members.findAll();
    res.json(members);
  } catch (err) {
    return res.status(500).json({ error: "Failed get data!" });
  }
});

// Get from postId ===================================
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const members = await Members.findAll({
      where: {
        PostId: postId,
      },
    });
    res.json(members);
  } catch (err) {
    return res.status(500).json({ error: "Failed get data!" });
  }
});

// Find item from id ===================================
router.get("/find/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Members.findByPk(id);
    res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Post not found!" });
  }
});

// Create Members ===================================
router.post("/create", async (req, res) => {
  const member = req.body;

  try {
    await Members.create(member);
    res.json(member);
  } catch (err) {
    return res.status(500).json({ error: "Failed created data!" });
  }
});

// Update Members ===================================
router.put("/find/:id", async (req, res) => {
  const id = req.params.id;
  const { name, PostId } = req.body;

  try {
    const post = await Members.findByPk(id);

    post.name = name;
    post.PostId = PostId;

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Post not found!" });
  }
});

// Delete Members ===================================
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const member = await Members.findOne({ where: { id: id } });
    await member.destroy();

    return res.json({ message: "Member has been deleted " });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Failed deleted data!" });
  }
});

module.exports = router;
