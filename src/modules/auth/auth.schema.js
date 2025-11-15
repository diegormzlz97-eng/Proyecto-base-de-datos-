import z from 'zod'

const authRegisterSchema = z.object({
  usuario: z.string().min(1),
  password: z.string().min(1), 
  nombre: z.string(), 
  role: z.int()
})

const authLoginSchema = z.object({
  usuario: z.string().min(1),
  password: z.string().min(1),
})

export function validateAuthRegister (input) {
  return authRegisterSchema.safeParse(input)
}

export function validateAuthLogin (input) {
  return authLoginSchema.safeParse(input)
}

export function errorFlattenError (result){
  return z.flattenError(result)
}

