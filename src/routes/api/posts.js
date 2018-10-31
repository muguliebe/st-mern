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
  let user = await User.findById(req.user.id);

  try {
    let post = await Post.findById(req.params.id);
    if (post.user.toString() !== user.id) {
      return res.status(401).json({notauthorized: 'only can delete by owner'})
    }
    post.remove().then(() => res.json({success: true}))

  } catch (e) {
    res.status(404).json({postnotfound: 'No Post found'})
  }

});

// @route   POST api/posts/like/:id
// @desc    like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  let user = await User.findById(req.user.id);

  try {
    let post = await Post.findById(req.params.id);
    if (post.likes.some(like => like.user.toString() === user.id)) {
      return res.status(400).json({alreadyliked: 'User already liked this post'});
    }

    post.likes.unshift({user: user.id});
    post.save().then(post => res.json(post));

  } catch (e) {
    res.status(404).json({postnotfound: 'No Post found'})
  }

});

// @route   POST api/posts/unlike/:id
// @desc    unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  let user = await User.findById(req.user.id);

  try {
    let post = await Post.findById(req.params.id);
    if (!post.likes.some(like => like.user.toString() === user.id)) {
      return res.status(400).json({notliked: 'You have not yet liked this post'});
    }

    //  get index of likes
    const idxRemove = post.likes
      .map(like => like.user.toString())
      .indexOf(user.id);

    post.likes.splice(idxRemove, 1);

    post.save().then(post => res.json(post))

  } catch (e) {
    res.status(404).json({postnotfound: 'No Post found'})
  }

});

// @route   POST api/posts/comment/:id
// @desc    add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    post.save().then(post => res.json(post));

  } catch (e) {
    res.status(404).json({postnotfound: 'No Post found'})
  }

});

// @route   DELETE api/posts/comment/:id/:commentId
// @desc    delete comment to post
// @access  Private
router.delete('/comment/:id/:commentId', passport.authenticate('jwt', {session: false}), async (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      // check comment exist
      let matchedComments = post.comments
        .filter(comment => comment._id.toString() === req.params.commentId);

      if (matchedComments.length === 0) {
        return res.status(404).json({commentnotexists: 'Comment does not exist'})
      }

      // get comment index
      const idxComment = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.commentId);

      // splice comment out of arr
      post.comments.splice(idxComment, 1);

      post.save().then(post => res.json(post));
    })
    .catch(e => {
      console.error(e);
      res.status(404).json({postnotfound: 'No Post found', detail: e.message});
    });

});

module.exports = router;
