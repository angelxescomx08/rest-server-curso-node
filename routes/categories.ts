import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories";
import { existCategory } from "../helpers/db-validators";

const routerCategories = Router();

routerCategories.get("/", getCategories);

routerCategories.get(
  "/:id",
  [
    check("id", "El id proporcionado no es un id válido").isMongoId(),
    check("id").custom(existCategory),
    validarCampos,
  ],
  getCategoryById
);

routerCategories.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  createCategory
);

routerCategories.put(
  "/:id",
  [
    validarJWT,
    check("id", "El id proporcionado no es un id válido").isMongoId(),
    check("id").custom(existCategory),
    check("name", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  updateCategory
);

routerCategories.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id proporcionado no es un id válido").isMongoId(),
    check("id").custom(existCategory),
    validarCampos,
  ],
  deleteCategory
);

export default routerCategories;
