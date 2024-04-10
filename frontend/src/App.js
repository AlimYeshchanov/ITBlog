import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CssBaseline, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Post from './pages/Post'
import NewPost from './pages/NewPost'
import Posts from './pages/Posts'
import UpdatePost from './pages/UpdatePost'

const defaultTheme = createTheme()

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Container maxWidth="lg">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-post" element={<PrivateRoute />}>
                <Route path="/new-post" element={<NewPost />} />
              </Route>
              <Route path="/posts" element={<PrivateRoute />}>
                <Route path="/posts" element={<Posts />} />
              </Route>
              <Route path="/post/:postId" element={<PrivateRoute />}>
                <Route path="/post/:postId" element={<Post />} />
              </Route>
              <Route path="/updatePost/:postId" element={<PrivateRoute />}>
                <Route path="/updatePost/:postId" element={<UpdatePost />} />
              </Route>
            </Routes>
          </Container>
        </Router>
        <ToastContainer />
        {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
      </ThemeProvider>
    </>
  )
}

export default App
