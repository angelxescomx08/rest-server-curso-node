import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(401).json({
      message: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(
      token as string,
      process.env.SECRET_PRIVATE_KEY as string
    ) as { uid: string };
    (req as any).uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "No autorizado",
    });
  }
};
