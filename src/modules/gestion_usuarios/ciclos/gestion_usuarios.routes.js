import { Router } from 'express'
import { UsuariosController } from './usuarios.controller.js'
import { authCookieMiddleware } from '../../core/middlewares/authCookie.js';

export const usuariosRouter = () => {
  
    const usuariosRouter = Router()
    const usuariosController = new usuariosController()

    usuariosRouter.get('/consultar', authCookieMiddleware, usuariosController.consultar)
    usuariosRouter.put('/editar', authCookieMiddleware, usuariosController.editar)
    usuariosRouter.delete('/eliminar', authCookieMiddleware, usuariosController.eliminar)
   
    return usuariosRouter
}
