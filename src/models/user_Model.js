// TODO: Crear modelo de datos de usuario
import { sequelize } from "../config/db.js";
import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import { hashString } from "../helpers/hash.js";

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

const UserModel = sequelize.define(
  "usuario",
  {
    // Model attributes are defined here
   
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    timestamps: true
  }
);

export async function getOneUser () {
  return await UserModel.findOne() ?? null
}

export async function getAllUsers () {
  return await UserModel.findAll() ?? null
}

export async function createUser (user) {
  const hashedPassword = await hashString(user.password)

  return await UserModel.create({ ...user, password: hashedPassword })
}

export async function getUserById (userId) {
  return await UserModel.findByPk(userId) ?? null
}

export async function getUserByEmailAndPassword ({ correo, password }) {
  const user = await UserModel.findOne({ where: { correo } })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  return user
}


export default UserModel;