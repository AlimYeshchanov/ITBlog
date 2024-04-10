import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
  Container,
} from '@mui/material'
import BackButton from '../components/BackButton'
import { getPost, updatePost } from '../features/posts/postSlice'

const categories = ['Java', 'Python', 'Javascript', 'React', 'Node', 'Php']

const UpdatePost = () => {
  // const [category, setCategory] = useState('')
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  const initialPostState = {
    postId: null,
    category: '',
    title: '',
    description: '',
  }
  const [currentPost, setCurrentPost] = useState(initialPostState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { postId } = useParams()

  useEffect(() => {
    dispatch(getPost(postId))
      .unwrap()
      .then((response) => {
        setCurrentPost(response)
      })
      .catch(toast.error)
  }, [dispatch, postId])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentPost({ ...currentPost, [name]: value })
  }

  const handleUpdatePost = (e) => {
    e.preventDefault()
    const postData = {
      postId: currentPost._id,
      category: currentPost.category,
      title: currentPost.title,
      description: currentPost.description,
    }
    dispatch(updatePost({ postId: currentPost._id, postData }))
    navigate('/posts')
    toast.success('The post was updated successfully!')
  }

  return (
    <Container maxWidth="md">
      <Grid item xs={12} md={6}>
        <Grid sx={{ display: 'flex' }}>
          <Grid sx={{ flex: 1 }} mt={'20px'}>
            <BackButton />
            <h3 align="center">Update Post</h3>

            {/* <form onSubmit={handleUpdatePost}>
              <input
                placeholder="Title..."
                value={post.title}
                type="text"
                id="title"
                name="title"
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description..."
                value={post.description}
                onChange={handleInputChange}
              />
              <select value={post.category} onChange={handleInputChange}>
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={post.category}>
                    {category}
                  </option>
                ))}
              </select>
              <button type="submit">Update</button>
            </form> */}
            <form onSubmit={handleUpdatePost}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="category"
                  label="Category"
                  name="category"
                  value={currentPost.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                size="small"
                fullWidth
                type="text"
                sx={{ mt: '15px' }}
                name="title"
                value={currentPost.title}
                onChange={handleInputChange}
              />

              <TextField
                id="description"
                label="Description"
                variant="outlined"
                size="small"
                fullWidth
                type="text"
                sx={{ mt: '15px' }}
                multiline={true}
                minRows={7}
                name="description"
                value={currentPost.description}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                //onClick={handleUpdatePost}
                variant="outlined"
                sx={{ mt: '15px' }}
              >
                Update
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UpdatePost
