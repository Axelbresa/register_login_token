import  Router  from 'express'
import { ctrlGetUserInfoByToken, ctrlLoginUser, ctrlRegisterUser } from '../controllers//auth_controllers.js'
import  createUserSchema  from '../models/schema/registro_schema.js'
import loginUserSchema  from '../models/schema/login_shema.js'
import  validator  from '../middleware/valition.js'

const authRouter = Router()

authRouter.get('/user', ctrlGetUserInfoByToken)

authRouter.post('/login', loginUserSchema, validator, ctrlLoginUser)

authRouter.post('/register', createUserSchema, validator, ctrlRegisterUser)

export default authRouter;