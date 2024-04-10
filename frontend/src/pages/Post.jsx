import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost } from '../features/posts/postSlice'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Box, Button } from '@mui/material'
import BackButton from '../components/BackButton'

const Post = () => {
  const { post } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { postId } = useParams()
  //console.log(post)

  useEffect(() => {
    dispatch(getPost(postId)).unwrap().catch(toast.error)
  }, [dispatch, postId])

  const handleDelete = () => {
    dispatch(deletePost(postId))
    toast.success('Post successfully deleted!')
    navigate('/posts')
  }

  if (!post) {
    return <Spinner />
  }

  return (
    <CardActionArea component="a" sx={{ mt: '30px' }}>
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: 1 }}>
          <BackButton />
          <Typography component="div" variant="h5" mb="20px" mt="20px">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb="20px">
            <span style={{ fontWeight: 'bold' }}>Author:</span> {post.user.name}{' '}
            {' / '}
            <span style={{ fontWeight: 'bold' }}>Date:</span> {post.createdAt}
            {' / '}
            <span style={{ fontWeight: 'bold', float: 'right' }}>
              Category: {post.category}
            </span>{' '}
            {post.category}
          </Typography>
          {post.user._id === user._id && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                mb: '30px',
              }}
            >
              <Button
                size="small"
                variant="outlined"
                startIcon={<AiFillEdit />}
                onClick={() => navigate(`/updatePost/${post._id}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AiFillDelete />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
          <Typography variant="body1" color="text.secondary" sx={{ mt: '5px' }}>
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default Post
