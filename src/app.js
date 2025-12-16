import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './core/middlewares/cors.js'
import { errorHandlerMiddleware } from './core/middlewares/errorHandler.js';

import { authRouter } from './modules/auth/auth.routes.js'
import { usuariosRouter } from './modules/usuarios/usuarios.routes.js'
import { ciclosRouter } from './modules/ciclos/ciclos.routes.js'

const app = express()
app.use(json())
app.use(cookieParser())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/auth', authRouter())
app.use('/usuarios', usuariosRouter())
app.use('/ciclos', ciclosRouter())

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`server listening on port http://localhost:${process.env.PORT}`)
})

