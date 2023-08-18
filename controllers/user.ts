import type { Request, Response } from "express";
import { User } from "../models/user";
import bcryptjs from "bcryptjs";

export const userGET = async (req: Request, res: Response) => {
  const { page = 1, limit = 5 } = req.query;
  const per_page = Number(limit);
  const actual_page = Number(page) - 1 < 0 ? 1 : Number(page) - 1;

  const users = await User.find()
    .limit(per_page)
    .skip(actual_page * per_page);
  res.json(users);
};

export const userPOST = async (req: Request, res: Response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({
    name,
    email,
    password,
    rol,
  });

  //cifrar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.status(201).json({
    user,
  });
};

export const userPUT = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);
  res.json({
    message: "Usuario actualizado correctamente",
    user,
  });
};

export const userDELETE = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "api DELETE - controller",
    id,
  });
};

export const userPATCH = (req: Request, res: Response) => {
  res.json({
    msg: "api PATCH - controller",
  });
};
