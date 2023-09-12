import { Router } from "express";
import { createProduct } from "../controllers/products";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from "express-validator";

const routerProduct = Router();

routerProduct.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es requerido").notEmpty(),
    check("user", "El id user no es un id valido de mongo").isMongoId(),
    check("price", "El precio debe ser un valor numérico").isNumeric(),
    check("category", "El id category no es un id valido de mongo").isMongoId(),
    check(
      "description",
      "Debes proporcionar una descripción para el producto"
    ).notEmpty(),
    check(
      "available",
      "La disponibilidad debe ser un valor booleano"
    ).isBoolean(),
    validarCampos,
  ],
  createProduct
);

export default routerProduct;
