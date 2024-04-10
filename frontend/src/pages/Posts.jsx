import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../features/posts/postSlice'
import Spinner from '../components/Spinner'
import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const Posts = () => {
  const { posts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (!posts) {
    return <Spinner />
  }

  return (
    <Grid item xs={12} md={6} sx={{ mt: '30px', mb: '10px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>CATEGORY</StyledTableCell>
              <StyledTableCell align="right">AUTHOR</StyledTableCell>
              <StyledTableCell align="right">DATE</StyledTableCell>
              <StyledTableCell align="right">TITLE</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.category}
                </TableCell>
                <TableCell align="right">{post.user.name}</TableCell>
                <TableCell align="right">{post.createdAt}</TableCell>
                <TableCell align="right">{post.title}</TableCell>
                <TableCell align="right">
                  <Link to={`/post/${post._id}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default Posts
