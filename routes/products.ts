import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from "express-validator";
import { existProduct } from "../helpers/db-validators";

const routerProduct = Router();

routerProduct.get("/", getProducts);

routerProduct.get(
  "/:id",
  [check("id", "El id no es un id valido de mongo").isMongoId(), validarCampos],
  getProductById
);

routerProduct.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es requerido").notEmpty(),
    //check("user", "El id user no es un id valido de mongo").isMongoId(),
    check("price", "El precio debe ser un valor numérico y es requerido")
      .isNumeric()
      .notEmpty(),
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

routerProduct.put(
  "/id",
  [
    validarJWT,
    check("id", "El id no es un id valido de mongo").isMongoId(),
    check("id").custom(existProduct),
    validarCampos,
  ],
  updateProduct
);

export default routerProduct;
