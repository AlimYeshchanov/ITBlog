import { Button } from '@mui/material'
import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      variant="outlined"
      startIcon={<FaArrowAltCircleLeft />}
      onClick={() => navigate('/posts')}
    >
      Go to POSTS
    </Button>
  )
}

export default BackButton
