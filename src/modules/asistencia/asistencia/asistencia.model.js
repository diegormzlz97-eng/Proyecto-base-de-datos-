import { getConnection  } from '../../config/database.js'
import { QueryError } from '../../core/errors/connection.error.js'
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";

export class asistenciaModel {

  static async buscarUsuariosPorNombre () {

    const conn = await getConnection();

    try { 
      
      const [rows] = await conn.query('SELECT id, nombre FROM usuarios ORDER BY nombre')
     
      const asistencia = rows.map(usuario => ({
          ...usuario,
          id: bufferToUuid(usuario.id)  // convertir binary → uuid string
      }));

      return asistencia

    } catch (error) {
      throw new QueryError('Error al consulta la existencia de los asistencia', 502, error)
    }
  }

  static async buscarasistenciaPorId ({id}) {

    const conn = await getConnection();

    try { 

      const [rows] = await conn.query(
        'SELECT id, nombre FROM usuarios WHERE id = ?',
        [uuidToBuffer(id)]
      )

      if(rows.length === 0) return []

      const usuario = rows[0];

      // Convertir BINARY → UUID string
      asistencia.id = bufferToUuid(asistencia.id);

      return asistencia
  
    } catch (error) {
      throw new QueryError('Error al buscar un asistencia por id', 502, error)
    }

  }

  static async existeasistenciaPorId ({ id }) {

    const conn = await getConnection();

    try { 
      const [user] = await conn.query(
        'SELECT EXISTS(SELECT 1 FROM asistencia WHERE id = ?) AS user_exists;',
        [uuidToBuffer(id)]
      )

      const [{ user_exists }] = user
      return user_exists === 1 ? true : false
    
    } catch (error) {
      throw new QueryError('Error al consulta la existencia de un asistencia', 502, error)
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
        return { status: false, message: "No se encontró el asistencia" };
      }else if(result.affectedRows === 1 && result.changedRows === 0){
        return { status: false, message: "Datos iguales, no hubo cambios" };
      }

      return { status: true, message: "Asistencia actualizado" };

    } catch (error) {
      throw new QueryError('Error al actualizar el nombre del asistencia por id', 502, error)
    }

  }

  static async eliminarPorId ({id}) {

    const conn = await getConnection();

    try { 

      const [result] = await conn.query(
       `DELETE FROM asistencia WHERE id = ?`,
        [uuidToBuffer(id)]
      )

      // Validaciones de resultado
      if (result.affectedRows === 0) {
        return { status: false, message: "Asistencia no encontrado" };
      }

      return { status: true, message: "Asistencia eliminado correctamente" };
      

    } catch (error) {
      throw new QueryError('Error al eliminar el nombre del asistencia por id', 502, error)
    }

  }


}