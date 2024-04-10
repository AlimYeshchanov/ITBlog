const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Java', 'Python', 'Javascript', 'React', 'Node', 'PHP'],
    },
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
