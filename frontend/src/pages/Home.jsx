import { Grid, CardContent } from '@mui/material'
import React from 'react'
import { BsEmojiSmileUpsideDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Grid item xs={12} md={6}>
      <CardContent
        sx={{
          maxWidth: 'md',
          margin: '150px auto',
        }}
      >
        {' '}
        {user ? (
          <h1 style={{ textAlign: 'center' }}>
            You are Welcome to Programming Blog page <BsEmojiSmileUpsideDown />
          </h1>
        ) : (
          <h3 style={{ textAlign: 'center' }}>
            In order to see interesting Posts, Please Register :)
          </h3>
        )}
      </CardContent>
    </Grid>
  )
}

export default Home
