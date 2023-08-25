import type { Response, Request, NextFunction } from "express";
import { RolType } from "../interfaces/rol";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).user) {
    return res.status(500).json({
      message: "No se ha establecido el usuario antes de usarlo",
    });
  }
  const { rol, name } = (req as any).user;
  if (RolType.ADMIN_ROL !== rol) {
    return res.status(401).json({
      message: `El usuario ${name} no es un administrador`,
    });
  }
  next();
};
