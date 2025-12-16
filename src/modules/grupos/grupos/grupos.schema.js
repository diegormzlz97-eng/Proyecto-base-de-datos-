import z from 'zod'

const usuarioIdSchema = z.object({
  id: z.string().min(1)
})

const usuarioNombreIdSchema = z.object({
  id: z.string().min(1), 
  nombre: z.string().min(1)
})

export function validateUsuarioId (input) {
  return usuarioIdSchema.safeParse(input)
}
export function validateUsuarioNombreId (input) {
  return usuarioNombreIdSchema.safeParse(input)
}

export function errorFlattenError (result){
  return z.flattenError(result)
}

