import axios from 'axios'

const API_URL = '/api/posts/'

//create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, postData, config)
  return response.data
}

//Get posts
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//Get post
const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + postId, config)
  return response.data
}

const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + postId, config)
  return response.data
}

const updatePost = async (postId, postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + postId, postData, config)
  return response.data
}

const postService = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
}
export default postService
