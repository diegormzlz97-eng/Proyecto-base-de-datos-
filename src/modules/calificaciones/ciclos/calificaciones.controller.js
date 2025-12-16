import { validateUsuarioId, validateUsuarioNombreId, errorFlattenError} from './calificaciones.schema.js'
import { UsuariosService } from './calaificaciones.service.js'

export class calaificacionesController {

  consultar = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validatecalificacioesId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await calificacionesService.consultarPorId({id})

      } else {
        resultado = await calificacionesService.consultar()
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

      const result = validatecalificacionesNombreId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const { nombre, id} = req.body
      const resultado = await calificacionesService.actualizarNombrePorId({nombre, id})

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

      const result = calificacionesvalidateId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const {id} = req.body
      const resultado = await calificacionesService.eliminarPorId({id})
      res.status(201).json({
        status: "success", 
        usuario: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}

