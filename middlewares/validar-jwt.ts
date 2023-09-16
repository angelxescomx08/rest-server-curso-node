import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const validarJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      message: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(
      token as string,
      process.env.SECRET_PRIVATE_KEY as string
    ) as { uid: string };
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        message: "Token no válido",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        message: "Token no válido",
      });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "No autorizado",
    });
  }
};
