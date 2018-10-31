const express  = require('express');
const router   = express.Router();
const passport = require('passport');

// model
const User = require('../../models/User');
const Post = require('../../models/Post');

// lord validator
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => {
  res.json({msg: 'profile Works'})
});

// @route   POST api/posts/
// @desc    create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  let savedPost = await newPost.save();
  res.status(200).json(savedPost);

});

// @route   GET api/posts/
// @desc    Get posts
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({date: -1});
    res.json(posts);
  } catch (e) {
    return res.status(404).json({nopostfound: 'No post found'})
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.json(posts);
  } catch (e) {
    return res.status(404).json({nopostfound: 'No post found that ID'})
  }
});

// @route   DELETE api/posts/:id
// @desc    Get posts
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  let user = User.findById(req.user.id);

  try {
    let post = Post.findById(req.params.id);
    if (post.user.toString() !== user.id) {
      return res.status(401).json({notauthorized: 'only can delete by owner'})
    }
    post.remove().then(() => res.json({success: true}))

  } catch (e) {
    res.status(404).json({postnotfound: 'No Post found'})
  }

});

module.exports = router;
