import { validateAuthRegister, validateAuthLogin, errorFlattenError} from './auth.schema.js'
import { AuthService } from './auth.service.js'

export class AuthController {

  login = async (req, res, next) => {

    const result = validateAuthLogin(req.body)

    if (!result.success) {return res.status(400).json({ status: "error_bad_request ", error: errorFlattenError(result.error)})}

    const { usuario, password} = req.body

    try {
      const user = await AuthService.login({usuario, password})
  
      res
      .cookie('access_token', user.token , {httpOnly: process.env.HTTP_ONLY, sameSite: process.env.SAME_SITE, maxAge: process.env.MAX_AGE})
      .status(201).json({
        status: "success", 
        user: user.user, 
        token: user.token, 
        menu: user.menu
      })
    } catch (error) {
      next(error);
    }
    
  
  }

  register = async (req, res, next) => {

    /*
    const result = validateAuth(req.body)

    if (!result.success) {
      return res.status(442).json({ error: JSON.parse(result.error.message) })
    }
    */

    const { usuario, password, nombre, role} = req.body

    try {
      const user = await AuthService.register({usuario, password, nombre, role})
      res.status(201).json({
        status: "success", 
        id: user
      })
    } catch (error) {
      next(error);
    }
   
  }

  logout = async (req, res, next) => {
    res
      .clearCookie('access_token')
      .status(200).json({
        status: "success"
      })
  }

}

