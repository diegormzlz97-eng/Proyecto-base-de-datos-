import { UsuariosModel } from './asistencia.model.js'
import { UsuariosError } from './asistencia.error.js'

export class asistenciaService {
    
    static async consultar (){
        const result = await asistenciaModel.buscarUsuariosPorNombre()    
        return result
    }

    static async consultarPorId ({id}){
        const result = await asistenciaModel.buscarUsuariosPorId({id})    
        return result
    }

    static async actualizarNombrePorId ({nombre, id}){

        //Verificar si existe el usuario
        const result = await asistenciaModel.existeUsuarioPorId({ id })  
        if(!result){ throw new asistenciaError("El asistencia no existe", 401) }
        
        //Actualizar el nombre del usuario
        const actualizacion = await asistenciaModel.actualizarNombrePorId({ nombre, id })
        if(!actualizacion.status){ throw new asistenciaError(actualizacion.message, 401) }
        
        //Obtener la informacion del usuario
        const info = await asistenciaModel.buscarUsuariosPorId({id})    
        return info
    }

    static async eliminarPorId ({id}) {
        //Verificar si existe el usuario
        const result = await asistenciaModel.existeUsuarioPorId({ id })  
        if(!result){ throw new asistenciaError("El usuario no existe", 401) }
        
        // Eliminar el usuario por id
        const eliminar = await asistenciaModel.eliminarPorId({ id })
        if(!eliminar.status){ throw new asistenciaError(eliminar.message, 401) }
          
        return {id: id, message: eliminar.message}
    }
}

