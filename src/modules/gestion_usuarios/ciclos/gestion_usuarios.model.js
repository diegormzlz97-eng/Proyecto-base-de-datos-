import { getConnection  } from '../../config/database.js'
import { QueryError } from '../../core/errors/connection.error.js'
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";

export class gestion_usuariosModel {

  static async buscarUsuariosPorNombre () {

    const conn = await getConnection();

    try { 
      
      const [rows] = await conn.query('SELECT id, nombre FROM usuarios ORDER BY nombre')
     
      const gestion_usuarios = rows.map(gestion_usuarios => ({
          ...gestion_usuarios,
          id: bufferToUuid(gestion_usuarios.id)  // convertir binary → uuid string
      }));

      return gestion_usuarios

    } catch (error) {
      throw new QueryError('Error al consulta la existencia de los usuarios', 502, error)
    }
  }

  static async buscarUsuariosPorId ({id}) {

    const conn = await getConnection();

    try { 

      const [rows] = await conn.query(
        'SELECT id, nombre FROM gestion_usuarios WHERE id = ?',
        [uuidToBuffer(id)]
      )

      if(rows.length === 0) return []

      const gestion_usuarios = rows[0];

      // Convertir BINARY → UUID string
      gestion_usuarios.id = bufferToUuid(gestion_usuarios.id);

      return gestion_usuarios
  
    } catch (error) {
      throw new QueryError('Error al buscar un usuario por id', 502, error)
    }

  }

  static async existegestion_usuariosPorId ({ id }) {

    const conn = await getConnection();

    try { 
      const [user] = await conn.query(
        'SELECT EXISTS(SELECT 1 FROM gestion_usuarios WHERE id = ?) AS user_exists;',
        [uuidToBuffer(id)]
      )

      const [{ user_exists }] = user
      return user_exists === 1 ? true : false
    
    } catch (error) {
      throw new QueryError('Error al consulta la existencia de un gestion_usuarios', 502, error)
    }
  }

  static async actualizarNombrePorId ({nombre, id}) {

    const conn = await getConnection();

    try { 

      const [result] = await conn.query(
        `UPDATE usuarios 
        SET nombre = ?
        WHERE id = ? `,
        [nombre, uuidToBuffer(id)]
      )

      if (result.affectedRows === 0) {
        return { status: false, message: "No se encontró el usuario" };
      }else if(result.affectedRows === 1 && result.changedRows === 0){
        return { status: false, message: "Datos iguales, no hubo cambios" };
      }

      return { status: true, message: "Usuario actualizado" };

    } catch (error) {
      throw new QueryError('Error al actualizar el nombre del gestion_usuarios por id', 502, error)
    }

  }

  static async eliminarPorId ({id}) {

    const conn = await getConnection();

    try { 

      const [result] = await conn.query(
       `DELETE FROM usuarios WHERE id = ?`,
        [uuidToBuffer(id)]
      )

      // Validaciones de resultado
      if (result.affectedRows === 0) {
        return { status: false, message: "Gestion_usuarios no encontrado" };
      }

      return { status: true, message: "Gestion_usuarios eliminado correctamente" };
      

    } catch (error) {
      throw new QueryError('Error al eliminar el nombre del gestion_usuarios por id', 502, error)
    }

  }


}