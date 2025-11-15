import jwt from 'jsonwebtoken'
import { CookieError , TokenError} from '../errors/session.error.js'

export function authCookieMiddleware(req, res, next) {

    try {

        const token = req.cookies?.access_token

        if (!token) { throw new CookieError('Token no encontrado', 401)}
        req.session = { user: null}
        
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.session = data

    } catch (error) {
        throw new TokenError('Token inválido o expirado', 401, error)
    }

    next()
}