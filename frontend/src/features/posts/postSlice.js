import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { extractErrorMessage } from '../../utils'

const initialState = {
  posts: null,
  post: null,
}

//create new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(postData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get posts
export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getPosts(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//Get post
export const getPost = createAsyncThunk(
  'posts/get',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getPost(postId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//delete post
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePost(postId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

//update Post
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ postId, postData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.updatePost(postId, postData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.post = null
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const oldPosts = state.posts.filter(
          (post) => post._id !== action.payload
        )
        state.posts = oldPosts
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.postId === action.payload.postId
        )
        state[index] = { ...state[index], ...action.payload }
        // state.posts = state.posts.map((post) =>
        //   post.id === action.payload.id ? action.payload : post
        // )
      })
  },
})

export default postSlice.reducer
