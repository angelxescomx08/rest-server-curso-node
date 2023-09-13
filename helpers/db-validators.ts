import { Category, Product } from "../models";
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

export const existIdUser = async (id: string) => {
  const userExist = await User.findById(id);

  if (!userExist) {
    throw new Error(`El id: ${id} no existe en la base de datos`);
  }
};

export const existCategory = async (id: string) => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new Error(`La categoría con id: ${id} no existe en la base de datos`);
  }
};

export const existProduct = async (id: string) => {
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new Error(`El producto con id: ${id} no existe en la base de datos`);
  }
};
