import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthModel } from './reportes.model.js'
import { AuthError } from './reportes.error.js'

export class reportesService {

  static async login ({ usuario, password} ){

    const result = await AuthModel.existereportes({ usuario })  
    if(!result){ throw new AuthError("El reportes no existe", 401) }
    const user = await AuthModel.obtenerPassworsPorreportes({ usuario })
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){ throw new AuthError("Contraseña no valida", 401) }

    const { password: _, ...publicUser} = user
    const token = jwt.sign({publicUser}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES })
    
    return {user: publicUser, token: token}

  }

  static async register ({ usuario, password, nombre, role } ){

    const result = await AuthModel.existereportes({ usuario })  
    if(result){ throw new AuthError("El reportes ya existe", 401) }
    return await AuthModel.crearreportes({ usuario, password, nombre, role })   

  }

}

