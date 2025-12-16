import { validateUsuarioId, validateUsuarioNombreId, errorFlattenError} from './asistencia.schema.js'
import { UsuariosService } from './asistencia.service.js'

export class asistenciaController {

  consultar = async (req, res, next) => {

    try {

      const { id } = req.body;

      let resultado;

      if (id) {
        
        const result = validateasistenciaId(req.body)
        if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
        resultado = await asistenciaService.consultarPorId({id})

      } else {
        resultado = await asistenciaService.consultar()
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

      const result = validateasistenciaNombreId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const { nombre, id} = req.body
      const resultado = await asistenciaService.actualizarNombrePorId({nombre, id})
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

      const result = validateasistenciaId(req.body)
      if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}
      
      const {id} = req.body
      const resultado = await asistenciaService.eliminarPorId({id})
      res.status(201).json({
        status: "success", 
        usuario: resultado
      })

    } catch (error) {
      next(error)
    }

  }

}

