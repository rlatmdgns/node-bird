const express = require('express');

const { Post, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');


const router = express.Router();

router.post('/', isLoggedIn, async(req, res, next) => {
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where : {id: post.id},
      include : [{
        model: Image,
      },{
        model : Comment,
      }]
    })
    res.status(201).json(fullPost);
  }catch(error){
    next(error);
  }
})

router.post('/:postId/comment', isLoggedIn, async(req, res, next) => {
  try{
    await Post.findOne({
      where : { id: req.params.postId },
    });
    if(!post){
      return res.status(403).send('존재하지 않는 게시글')
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.body.postId,
      UserId: req.user.id,
    });
    res.status(201).json(comment);
  }catch(error){
    next(error);
  }
})

router.delete('/', (req, res) => {
  res.send('hellow express');
})
module.exports = router