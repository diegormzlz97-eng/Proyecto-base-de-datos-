import { getConnection  } from '../../config/database.js'
import { QueryError } from '../../core/errors/connection.error.js'
import { uuidToBuffer, bufferToUuid } from "../../core/utils/uuid.js";

export class gruposModel {

  static async buscarUsuariosPorNombre () {

    const conn = await getConnection();

    try { 
      
      const [rows] = await conn.query('SELECT id, nombre FROM usuarios ORDER BY nombre')
     
      const grupos = rows.map(usuario => ({
          ...usuario,
          id: bufferToUuid(usuario.id)  // convertir binary → uuid string
      }));

      return grupos

    } catch (error) {
      throw new QueryError('Error al consulta la existencia de los grupos', 502, error)
    }
  }

  static async buscarGruposPorId ({id}) {
    const conn = await getConnection();

    try { 

      const [rows] = await conn.query(
        'SELECT id, nombre FROM usuarios WHERE id = ?',
        [uuidToBuffer(id)]
      )

      if(rows.length === 0) return []

      const grupos = rows[0];

      // Convertir BINARY → UUID string
      grupos.id = bufferToUuid(grupos.id);

      return grupos
  
    } catch (error) {
      throw new QueryError('Error al buscar un grupo por id', 502, error)
    }

  }

  static async existeUsuarioPorId ({ id }) {

    const conn = await getConnection();

    try { 
      const [user] = await conn.query(
        'SELECT EXISTS(SELECT 1 FROM grupos WHERE id = ?) AS user_exists;',
        [uuidToBuffer(id)]
      )

      const [{ user_exists }] = user
      return user_exists === 1 ? true : false
    
    } catch (error) {
      throw new QueryError('Error al consulta la existencia de un grupo', 502, error)
    }
  }

  static async actualizarNombrePorId ({nombre, id}) {

    const conn = await getConnection();

    try { 

      const [result] = await conn.query(
        `UPDATE grupos 
        SET nombre = ?
        WHERE id = ? `,
        [nombre, uuidToBuffer(id)]
      )

      if (result.affectedRows === 0) {
        return { status: false, message: "No se encontró el grupos" };
      }else if(result.affectedRows === 1 && result.changedRows === 0){
        return { status: false, message: "Datos iguales, no hubo cambios" };
      }

      return { status: true, message: "grupos actualizado" };

    } catch (error) {
      throw new QueryError('Error al actualizar el nombre del grupos por id', 502, error)
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
        return { status: false, message: "grupos no encontrado" };
      }

      return { status: true, message: "grupos eliminado correctamente" };
      

    } catch (error) {
      throw new QueryError('Error al eliminar el nombre del grupos por id', 502, error)
    }

  }


}