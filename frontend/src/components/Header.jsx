import React from 'react'
import { Typography, Stack, Toolbar, Button } from '@mui/material'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { IoIosCreate } from 'react-icons/io'
import { HiOutlineViewList } from 'react-icons/hi'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Typography
        component="h2"
        variant="h6"
        color="inherit"
        align="left"
        noWrap
        sx={{ flex: 1, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        IT_BLOG
      </Typography>
      <Stack direction={'row'} spacing={2}>
        {user ? (
          <>
            <Button
              variant="outlined"
              size="small"
              startIcon={<HiOutlineViewList />}
              onClick={() => navigate('/posts')}
            >
              Posts
            </Button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<IoIosCreate />}
              onClick={() => navigate('/new-post')}
            >
              Create
            </Button>
            <Button
              onClick={onLogout}
              variant="outlined"
              size="small"
              startIcon={<FaSignOutAlt />}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FaSignInAlt />}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FaUser />}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </>
        )}
      </Stack>
    </Toolbar>
  )
}

export default Header
