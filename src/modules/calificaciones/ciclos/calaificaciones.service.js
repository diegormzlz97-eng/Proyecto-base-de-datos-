import { UsuariosModel } from './calificaciones.model.js'
import { UsuariosError } from './calificaciones.error.js'

export class ciclosService {
    
    static async consultar (){
        const result = await ciclosModel.buscarUsuariosPorNombre()    
        return result
    }

    static async consultarPorId ({id}){
        const result = await ciclosModel.buscarUsuariosPorId({id})    
        return result
    }

    static async actualizarNombrePorId ({nombre, id}){

        //Verificar si existe el usuario
        const result = await ciclosModel.existeUsuarioPorId({ id })  
        if(!result){ throw new UsuariosError("El usuario no existe", 401) }
        
        //Actualizar el nombre del usuario
        const actualizacion = await ciclosModel.actualizarNombrePorId({ nombre, id })
        if(!actualizacion.status){ throw new UsuariosError(actualizacion.message, 401) }
        
        //Obtener la informacion del usuario
        const info = await ciclosModel.buscarUsuariosPorId({id})    
        return info
    }

    static async eliminarPorId ({id}){

        //Verificar si existe el usuario
        const result = await ciclosModel.existeUsuarioPorId({ id })  
        if(!result){ throw new UsuariosError("El usuario no existe", 401) }
        
        // Eliminar el usuario por id
        const eliminar = await ciclosModel.eliminarPorId({ id })
        if(!eliminar.status){ throw new UsuariosError(eliminar.message, 401) }
          
        return {id: id, message: eliminar.message}
    }
}

