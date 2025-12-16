import { Router } from 'express'
import { CiclosController } from './usuarios.controller.js'
import { authCookieMiddleware } from '../../core/middlewares/authCookie.js';

export const ciclosRouter = () => {
  
    const ciclosRouter = Router()
    const ciclosController = new CiclosController()
 
    ciclosRouter.post('/crear', authCookieMiddleware, ciclosController.crear)
    ciclosRouter.get('/consultar', authCookieMiddleware, ciclosController.consultar)
    ciclosRouter.put('/editar', authCookieMiddleware, ciclosController.editar)
    ciclosRouter.delete('/eliminar', authCookieMiddleware, ciclosController.eliminar)
   
    return ciclosRouter
}
