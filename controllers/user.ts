import type { Request, Response } from "express";
import { User } from "../models/user";
import bcryptjs from "bcryptjs";

export const userGET = (req: Request, res: Response) => {
  const { page = 1, limit = 100 } = req.query;
  res.json({
    msg: "api GET - controller",
    page,
    limit,
  });
};

export const userPOST = async (req: Request, res: Response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({
    name,
    email,
    password,
    rol,
  });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.status(201).json({
    user,
  });
};

export const userPUT = (req: Request, res: Response) => {
  res.json({
    msg: "api PUT - controller",
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
