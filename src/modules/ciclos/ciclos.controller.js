import { validateUsuarioId, validateUsuarioNombreId, errorFlattenError} from './ciclos.schema.js'
import { UsuariosService } from './ciclos.service.js'

export class ciclosController {

  consultar = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validateciclosId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await ciclosService.consultarPorId({id})

      } else {
        resultado = await ciclosService.consultar()
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
      const resultado = await UsuariosService.actualizarNombrePorId({nombre, id})

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
      const resultado = await UsuariosService.eliminarPorId({id})

      res.status(201).json({
        status: "success", 
        usuario: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}

