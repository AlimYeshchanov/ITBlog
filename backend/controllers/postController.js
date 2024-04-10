const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Post = require('../models/postModel')

//@desc Create new post
//@route POST /api
//@access Private
const createPost = asyncHandler(async (req, res) => {
  const { category, title, description } = req.body
  if (!category || !title || !description) {
    res.status(400)
    throw new Error('Please add a category and title and description')
  }

  //get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const post = await Post.create({
    category,
    title,
    description,
    user: req.user.id,
  })
  res.status(201).json(post)
})

//get posts
//route GET /api/posts
//access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('user', '-password')
  if (!posts) {
    res.status(404)
    throw new Error('Posts not found')
  }
  return res.status(200).json(posts)
})

//get post
//route GET /api/posts/:id
//access Private
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', '-password')
  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }
  res.status(200).json(post)
})

// Delete post
//route DELETE /api/posts/:id
//access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await post.deleteOne()
  res.status(200).json({ msg: 'Successfully deleted the post' })
})

// Update post
//route PUT /api/posts/:id
//access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404)
    throw new Error('Post not found')
  }
  if (post.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedPost)
})

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
}
