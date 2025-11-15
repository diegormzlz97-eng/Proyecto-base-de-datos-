import { ConnectionError, QueryError } from '../errors/connection.error.js'

export function errorHandlerMiddleware(err, req, res, next) {
  // console.error('Error capturado:', err.message);

  const statusDefault = 500

  /*
  if (err instanceof ConnectionError) {
    return res.status(err.status || statusDefault).json({
      status: "error", 
      message: err.message, 
      originalError: err.originalError
    });
  }
  */

  res.status(err.status || statusDefault).json({
    status: "error",
    message: err.message || 'Error interno del servidor'
  });

}