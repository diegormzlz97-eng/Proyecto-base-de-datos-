import { UsuariosModel } from './ciclos.model.js'
import { UsuariosError } from './ciclos.error.js'

export class ciclosService {
    
    static async consultar (){
        const result = await UsuariosModel.buscarciclosPorNombre()    
        return result
    }

    static async consultarPorId ({id}){
        const result = await UsuariosModel.buscarciclosPorId({id})    
        return result
    }

    static async actualizarNombrePorId ({nombre, id}){

        //Verificar si existe el usuario
        const result = await UsuariosModel.existeciclosPorId({ id })  
        if(!result){ throw new ciclosError("El usuario no existe", 401) }
        
        //Actualizar el nombre del usuario
        const actualizacion = await UsuariosModel.actualizarNombrePorId({ nombre, id })
        if(!actualizacion.status){ throw new ciclosError(actualizacion.message, 401) }

        //Obtener la informacion del usuario
        const info = await UsuariosModel.buscarciclosPorId({id})    
        return info
    }

    static async eliminarPorId ({id}){

        //Verificar si existe el usuario
        const result = await UsuariosModel.existeUsuarioPorId({ id })  
        if(!result){ throw new ciclosError("El usuario no existe", 401) }
        
        // Eliminar el usuario por id
        const eliminar = await UsuariosModel.eliminarPorId({ id })
        if(!eliminar.status){ throw new ciclosError(eliminar.message, 401) }
          
        return {id: id, message: eliminar.message}
    }
}

