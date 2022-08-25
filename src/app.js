//* Dependencias
const express = require('express')
const config = require('./config')
const passport = require('passport')
const { verbMiddleware } = require('./middleware/ejemplos/verb')
require('./middleware/auth.middleware')(passport)


//* Archivos de Rutas

const userRouter = require('./users/users.router.js').router
const authRouter = require('./auth/auth.router.js').router
const postRouter = require('./post/post.router').router



//* Configuraciones Iniciales
const app = express()

app.use(express.json())


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postRouter)

app.listen(config.port, ()=>{
    console.log(`server started at port ${config.port}`)
})


exports.default = app