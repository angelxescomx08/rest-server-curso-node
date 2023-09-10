import { Router, type Request, type Response } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { createCategory, getCategories } from "../controllers/categories";

const router = Router();

router.get("/", [], getCategories);

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
