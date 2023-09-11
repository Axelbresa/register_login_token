import usuarioModel, {getAllUsers, getOneUser} from "../models/user_Model.js";

// Crear un usuario
export const createUserr = async (req, res) => {
    const {    
    username,
    age
     } = req.body;
      try{
        const Usuario = new usuarioModel  ({ 
          username,
          age    
          })
          await Usuario.save()
          return res.status(201).json({
            message: 'Se creo un usuario'
  
          })
      }catch{
        console.log('Error al crear un usuario')
          return res.status(500).json({
            message: 'Error al crear un usuario',  
          })
      }
  };

export const ctrlGetAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers()
  
      if (!users) {
        return res.sendStatus(404)
      }
      res.status(200).json(users)
    } catch (error) {
      console.log(error)
      res.status(500).json('Unexpected error')
    }
  }

  export const ctrlGetOneUser= async (req, res)=>{
        try {
          const { id } = req.params;
          const oneUsuario = await getOneUser.findOne({
              where: {
                  estado: true,
                  id,      
              }
          });
          return res.json(oneUsuario);
      } catch (error) {
          console.log(error);
          return res.status(500).json({
              message: 'Error al obtener un usuario'
          })
      }
    }

export const actualizarUsuario=async(req, res)=>{
  try {
    const { id } = req.params;
    const reserva = await usuarioModel.findByPk(id);
    await reserva.update(req.body)
    return res.json({
        message: 'usuario actualizado exitosamente'
    });
} catch (error) {
    console.log('Error al actualizar el usuario', error);
    return res.status(error.status || 500).json({
        message: error.message
    })
}
}

//Eliminar una usuario de forma lógica
export const EliminarUsuario = async (req, res)=>{
  try {
    const { id } = req.params;
    if(!id){
        throw({
            status: 400,
            message: 'No se ha enviado el id de usuario'
        })
    }
    const reserva = await usuarioModel.findByPk(id);
    await reserva.destroy({ estado: false });
    return res.json({ message: 'usuario se eliminó correctamente' })
} catch (error) {
    console.log('Error al eliminar la post', error);
    return res.status(error.status || 500).json({
        message: error.message || 'Error al eliminar el usuario'
    })
}
}