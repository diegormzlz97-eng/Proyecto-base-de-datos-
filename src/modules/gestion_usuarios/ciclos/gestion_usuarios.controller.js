import { validateUsuarioId, validateUsuarioNombreId, errorFlattenError} from './usuarios.schema.js'
import { UsuariosService } from './usuarios.service.js'

export class gestion_usuariosController {

  consultar = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validateUsuarioId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await gestion_usuariosService.consultarPorId({id})

      } else {
        resultado = await gestion_usuariosService.consultar()
      }

      res.status(201).json({
        status: "success", 
        usuarios: resultado
      })

    } catch (error) {
      next(error)
    }

  }

  editar = async (req, res, next) => {

    try {

      const result = validateUsuarioNombreId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const { nombre, id} = req.body
      const resultado = await gestion_usuariosService.actualizarNombrePorId({nombre, id})

      res.status(201).json({
        status: "success", 
        usuarios: resultado
      })

    } catch (error) {
      next(error)
    }

  }

  eliminar = async (req, res, next) => {

    try {

      const result = validateUsuarioId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const {id} = req.body
      const resultado = await gestion_usuariosService.eliminarPorId({id})

      res.status(201).json({
        status: "success", 
        usuario: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}

