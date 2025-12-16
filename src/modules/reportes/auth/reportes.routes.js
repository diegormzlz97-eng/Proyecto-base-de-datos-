import { Router } from 'express'
import { AuthController } from './auth.controller.js'

export const authRouter = () => {
  
    const authRouter = Router()
    const authController = new AuthController()
 
    authRouter.post('/login', authController.login)
    authRouter.post('/register', authController.register)
    authRouter.post('/logout', authController.logout)

    return authRouter
}
