//const path = require('path')
const express = require('express')
require('colors')
require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')

//connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))

// Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   //FIX: below code fixes app crashing on refresh in deployment
//   app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
//   })
// } else {
//   app.get('/', (_, res) => {
//     res.status(200).json({ message: 'Welcome to the IT-Blog' })
//   })
// }

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
