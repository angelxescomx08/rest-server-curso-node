import { Router } from "express";
import { check } from "express-validator";
import {
  userDELETE,
  userGET,
  userGETById,
  userPATCH,
  userPOST,
  userPUT,
} from "../controllers/user";
import { validarCampos } from "../middlewares/validar-campos";
import { existIdUser, existsEmail, isValidRol } from "../helpers/db-validators";
import { validarJWT } from "../middlewares/validar-jwt";
import { hasRol } from "../middlewares/validar-roles";
import { RolType } from "../interfaces/rol";

const routerUser = Router();

routerUser.get("/", userGET);

routerUser.get(
  "/:id",
  [check("id", "El id no es un id válido de mongo").isMongoId(), validarCampos],
  userGETById
);

routerUser.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("rol", "El rol no es válido").isIn(["ADMIN_ROL", "USER_ROL"]),
    check("email", "El correo electrónico no es válido").isEmail(),
    check("email").custom(existsEmail),
    check("rol").custom(isValidRol),
    validarCampos,
  ],
  userPOST
);

routerUser.put(
  "/:id",
  [
    check("id", "El id no es un id válido de mongo").isMongoId(),
    check("id").custom(existIdUser),
    check("rol").custom(isValidRol),
    validarCampos,
  ],
  userPUT
);

routerUser.delete(
  "/:id",
  [
    validarJWT,
    //isAdmin,
    hasRol(RolType.ADMIN_ROL, RolType.USER_ROL),
    check("id", "El id no es un id válido de mongo").isMongoId(),
    check("id").custom(existIdUser),
    validarCampos,
  ],
  userDELETE
);

routerUser.patch("/", userPATCH);

export default routerUser;
