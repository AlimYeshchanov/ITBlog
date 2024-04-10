import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost } from '../features/posts/postSlice'
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

const NewPost = () => {
  const { user } = useSelector((state) => state.auth)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [category, setCategory] = useState('Java')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({ category, title, description }))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/posts')
        toast.success('New post created!')
      })
      .catch(toast.error)
  }

  return (
    <Container maxWidth="md">
      <Grid item xs={12} md={6}>
        <Grid sx={{ display: 'flex' }}>
          <Grid sx={{ flex: 1 }} mt={'20px'}>
            <BackButton />
            <h3 align="center">Create New Post</h3>
            <TextField
              id="Author"
              label="Author"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              sx={{ mb: '15px' }}
              name="name"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              type="email"
              sx={{ mb: '15px' }}
              name="email"
              value={email}
              onChange={(e) => setTitle(e.target.value)}
            />
            <form onSubmit={onSubmit}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="category"
                  label="Category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Java">Java</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                  <MenuItem value="Javascript">Javascript</MenuItem>
                  <MenuItem value="React">React</MenuItem>
                  <MenuItem value="Node">Node</MenuItem>
                  <MenuItem value="Php">Php</MenuItem>
                </Select>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="text"
                  sx={{ mt: '15px' }}
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" variant="outlined" sx={{ mt: '15px' }}>
                  Submit
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NewPost
