import { Router, type Request, type Response } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { createCategory } from "../controllers/categories";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "ok",
  });
});

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  createCategory
);

export default router;
