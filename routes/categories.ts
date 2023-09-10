import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categories";

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "El id proporcionado no es un id válido").isMongoId(),
    validarCampos,
  ],
  getCategoryById
);

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
