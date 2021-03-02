const express = require('express');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get("/", async(req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
      },{
        model:Image,
      },{
        model:Comment,
      }]
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;