import crypto  from 'node:crypto'
import bcrypt  from 'bcrypt'
import { getConnection  } from '../../config/database.js'
import { QueryError } from '../../core/errors/connection.error.js'
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";

export class AuthModel {

  static async obtenerPassworsPorUsuario ({ usuario }) {

    const conn = await getConnection();

    try { 
      const [result] = await conn.query(
        'SELECT id,password,nombre,role FROM usuarios WHERE usuario = ?;',
        [usuario]
      )

      if (result.length === 0) { throw new QueryError('Error el usuario no existe', 502) }
      const user = result[0]

      return {
        id: bufferToUuid(user.id),
        password: user.password, 
        nombre: user.nombre,
        role: user.role
      }
    
    } catch (error) {
      throw new QueryError('Error al consulta la existencia de un usuario', 502, error)
    }
  }
  
  static async existeUsuario ({ usuario }) {

    const conn = await getConnection();

    try { 
      const [user] = await conn.query(
        'SELECT EXISTS(SELECT 1 FROM usuarios WHERE usuario = ?) AS user_exists;',
        [usuario]
      )

      const [{ user_exists }] = user
      return user_exists === 1 ? true : false
    
    } catch (error) {
      throw new QueryError('Error al consulta la existencia de un usuario', 502, error)
    }
  }

  static async crearUsuario ({ usuario, password, nombre, role}){

    const uuid = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, 10)     
    const conn = await getConnection();

    try { 
     
      const [result] = await conn.query(
        `INSERT INTO usuarios (id, usuario, password, nombre, role) VALUES (?, ?, ?, ?, ?);`,
        [uuidToBuffer(uuid),usuario, hashedPassword, nombre, role]
      )

      if(result.affectedRows === 0){
        throw new QueryError('No se pudo crear el usuario', 502, error)
      }

      return uuid

    } catch (error) {
      throw new QueryError('Error al crear un usuario', 502, error)
    }

  }

}