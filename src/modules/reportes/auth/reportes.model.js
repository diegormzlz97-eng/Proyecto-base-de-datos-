import crypto  from 'node:crypto'
import bcrypt  from 'bcrypt'
import { getConnection  } from '../../config/database.js'
import { QueryError } from '../../core/errors/connection.error.js'
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";

export class reportesModel {

  static async obtenerPassworsPorUsuario ({ usuario }) {

    const conn = await getConnection();

    try { 
      const [result] = await conn.query(
        'SELECT id,password,nombre,role FROM reportes WHERE reportes = ?;',
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
      throw new QueryError('Error al consulta la existencia de un reportes', 502, error)
    }
  }
  
  static async existeUsuario ({ reportes }) {

    const conn = await getConnection();

    try { 
      const [user] = await conn.query(
        'SELECT EXISTS(SELECT 1 FROM reportes WHERE reportes = ?) AS user_exists;',
        [reportes]
      )

      const [{ user_exists }] = user
      return user_exists === 1 ? true : false
    
    } catch (error) {
      throw new QueryError('Error al consulta la existencia de un reportes', 502, error)
    }
  }

  static async crearreportes ({ usuario, password, nombre, role}){

    const uuid = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, 10)     
    const conn = await getConnection();

    try { 
     
      const [result] = await conn.query(
        `INSERT INTO reportes (id, usuario, password, nombre, role) VALUES (?, ?, ?, ?, ?);`,
        [uuidToBuffer(uuid),usuario, hashedPassword, nombre, role]
      )

      if(result.affectedRows === 0){
        throw new QueryError('No se pudo crear el reportes', 502, error)
      }

      return uuid

    } catch (error) {
      throw new QueryError('Error al crear un reportes', 502, error)
    }

  }

}