import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthModel } from './auth.model.js'
import { AuthError } from './auth.error.js'

export class AuthService {

  static async login ({ usuario, password} ){

    const result = await AuthModel.existeUsuario({ usuario })  
    if(!result){ throw new AuthError("El usuario no existe", 401) }
    const user = await AuthModel.obtenerPassworsPorUsuario({ usuario })
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){ throw new AuthError("Contraseña no valida", 401) }

    const { password: _, ...publicUser} = user
    const token = jwt.sign({publicUser}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES })
    
    return {user: publicUser, token: token}

  }

  static async register ({ usuario, password, nombre, role } ){

    const result = await AuthModel.existeUsuario({ usuario })  
    if(result){ throw new AuthError("El usuario ya existe", 401) }
    return await AuthModel.crearUsuario({ usuario, password, nombre, role })   

  }

}

