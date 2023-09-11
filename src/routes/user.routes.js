import  Router  from 'express';
import validador from '../middleware/valition.js';
import createUserSchema from '../models/schema/user_schema.js';

import {
  createUserr,
  ctrlGetAllUsers,
  ctrlGetOneUser,
  actualizarUsuario,
  EliminarUsuario
} from '../controllers/user_controllers.js';

const router = Router();

router.post('/',  createUserSchema, validador, createUserr,);

router.get('/', ctrlGetAllUsers);

router.get('/:id',ctrlGetOneUser);

router.put('/:id', actualizarUsuario);

router.delete('/:id', EliminarUsuario);

export default router;