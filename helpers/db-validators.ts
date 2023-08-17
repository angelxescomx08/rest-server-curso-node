import { Rol } from "../models/rol";

export const isValidRol = async (rol: string = "") => {
  const existsRol = await Rol.findOne({
    rol,
  });
  if (!existsRol) {
    throw new Error(`El rol ${rol} no está definido en la base de datos`);
  }
};
