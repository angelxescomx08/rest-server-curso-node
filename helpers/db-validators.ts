import { Rol } from "../models/rol";
import { User } from "../models/user";

export const isValidRol = async (rol: string = "") => {
  const existsRol = await Rol.findOne({
    rol,
  });
  if (!existsRol) {
    throw new Error(`El rol ${rol} no está definido en la base de datos`);
  }
};

export const existsEmail = async (email: string) => {
  const emailExists = await User.findOne({
    email,
  });

  if (emailExists) {
    throw new Error(`El correo electrónico ${email} ya está ocupado`);
  }
};
